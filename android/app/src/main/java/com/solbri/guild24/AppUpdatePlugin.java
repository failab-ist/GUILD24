package com.solbri.guild24;

import android.app.Activity;
import android.content.Intent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.appupdate.AppUpdateOptions;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;

/**
 * Forced update through Play in-app updates (immediate mode). The game never blocks on this: the config is a tiny JSON
 * ({"minVersionCode": N}) read with a short time limit, and every failure (offline, bad JSON, no Play) lets the game start.
 * Only an installed versionCode below minVersionCode starts Play's full-screen update; leaving that screen closes the app.
 */
@CapacitorPlugin(name = "AppUpdate")
public class AppUpdatePlugin extends Plugin {
  private static final int REQUEST = 24024;
  private static final int NET_MS = 3000;

  private AppUpdateManager manager() {
    return AppUpdateManagerFactory.create(getContext());
  }

  /** Reads minVersionCode from the config; 0 (never forces) on any problem. */
  static int minVersionCode(String url) {
    HttpURLConnection c = null;
    try {
      c = (HttpURLConnection) new URL(url).openConnection();
      c.setConnectTimeout(NET_MS);
      c.setReadTimeout(NET_MS);
      c.setUseCaches(false);
      if (c.getResponseCode() != 200) return 0;
      InputStream in = c.getInputStream();
      ByteArrayOutputStream out = new ByteArrayOutputStream();
      byte[] buf = new byte[1024];
      int n;
      while ((n = in.read(buf)) > 0 && out.size() < 4096) out.write(buf, 0, n);
      return new JSONObject(out.toString("UTF-8")).optInt("minVersionCode", 0);
    } catch (Exception e) {
      return 0;
    } finally {
      if (c != null) c.disconnect();
    }
  }

  private int installedCode() throws Exception {
    return (int) getContext().getPackageManager().getPackageInfo(getContext().getPackageName(), 0).getLongVersionCode();
  }

  private void start(AppUpdateInfo info) {
    try {
      manager().startUpdateFlowForResult(info, getActivity(), AppUpdateOptions.newBuilder(AppUpdateType.IMMEDIATE).build(), REQUEST);
    } catch (Exception ignored) {
    }
  }

  /** check({url}) -> {forced: boolean}. */
  @PluginMethod
  public void check(final PluginCall call) {
    final String url = call.getString("url", "");
    new Thread(() -> {
      JSObject r = new JSObject();
      r.put("forced", false);
      try {
        if (url.isEmpty() || minVersionCode(url) <= installedCode()) {
          call.resolve(r);
          return;
        }
        manager().getAppUpdateInfo()
            .addOnSuccessListener(info -> {
              boolean ok = info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
                  && info.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE);
              if (ok) start(info);
              JSObject o = new JSObject();
              o.put("forced", ok);
              call.resolve(o);
            })
            .addOnFailureListener(e -> call.resolve(r));
      } catch (Exception e) {
        call.resolve(r);
      }
    }).start();
  }

  /** Backing out of Play's update screen must not leave the game running on the old version. */
  @Override
  protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
    super.handleOnActivityResult(requestCode, resultCode, data);
    if (requestCode == REQUEST && resultCode != Activity.RESULT_OK) getActivity().finishAndRemoveTask();
  }

  /** An update that was started and interrupted (home button) goes on when the player returns. */
  @Override
  protected void handleOnResume() {
    super.handleOnResume();
    try {
      manager().getAppUpdateInfo().addOnSuccessListener(info -> {
        if (info.updateAvailability() == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS) start(info);
      });
    } catch (Exception ignored) {
    }
  }
}
