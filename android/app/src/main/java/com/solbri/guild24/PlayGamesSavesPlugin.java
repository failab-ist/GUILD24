package com.solbri.guild24;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.SnapshotsClient;
import com.google.android.gms.games.snapshot.Snapshot;
import com.google.android.gms.games.snapshot.SnapshotMetadataChange;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

/**
 * Google Play Games Saved Games as cloud backup (PLATFORM_RELEASE §Google Play Games Saved Games).
 * One snapshot holds the envelope {rev, at, data}; data is the game's own Save JSON string.
 * Every failure (not signed in, offline, no app id yet) rejects, and the game then plays on its local Save.
 * Conflict rule: larger rev wins, equal rev -> later at wins. clear() commits an empty snapshot
 * (load reports found:false); ponytail: no real delete, add SnapshotsClient.delete if the empty entry ever matters.
 */
@CapacitorPlugin(name = "PlayGamesSaves")
public class PlayGamesSavesPlugin extends Plugin {
  private static final String NAME = "guild24_save";

  private SnapshotsClient client() {
    return PlayGames.getSnapshotsClient(getActivity());
  }

  /** Opens the snapshot, resolving any conflict by the rev/at rule, then hands back the winner. */
  private void open(final SnapshotsClient.DataOrConflict<Snapshot> prev, final PluginCall call, final Handler h) {
    if (prev == null) {
      client().open(NAME, true, SnapshotsClient.RESOLUTION_POLICY_MANUAL)
          .addOnSuccessListener(r -> open(r, call, h))
          .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
      return;
    }
    if (!prev.isConflict()) {
      try {
        h.run(prev.getData());
      } catch (Exception e) {
        call.reject(String.valueOf(e.getMessage()));
      }
      return;
    }
    SnapshotsClient.SnapshotConflict c = prev.getConflict();
    Snapshot winner = newer(c.getSnapshot(), c.getConflictingSnapshot()) ? c.getSnapshot() : c.getConflictingSnapshot();
    client().resolveConflict(c.getConflictId(), winner)
        .addOnSuccessListener(r -> open(r, call, h))
        .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
  }

  private interface Handler {
    void run(Snapshot s) throws Exception;
  }

  private static JSONObject env(Snapshot s) {
    try {
      byte[] b = s.getSnapshotContents().readFully();
      if (b == null || b.length == 0) return null;
      return new JSONObject(new String(b, StandardCharsets.UTF_8));
    } catch (Exception e) {
      return null;
    }
  }

  /** true when a is at least as new as b. A snapshot with no valid envelope loses. */
  private static boolean newer(Snapshot a, Snapshot b) {
    return newer(env(a), env(b));
  }

  private static boolean newer(JSONObject a, JSONObject b) {
    if (a == null) return b == null;
    if (b == null) return true;
    long ra = a.optLong("rev"), rb = b.optLong("rev");
    return ra != rb ? ra > rb : a.optLong("at") >= b.optLong("at");
  }

  @PluginMethod
  public void load(final PluginCall call) {
    open(null, call, s -> {
      JSONObject e = env(s);
      JSObject out = new JSObject();
      if (e == null || !e.has("data")) {
        out.put("found", false);
      } else {
        out.put("found", true);
        out.put("data", e.getString("data"));
        out.put("rev", e.optLong("rev"));
        out.put("at", e.optLong("at"));
      }
      call.resolve(out);
      client().discardAndClose(s);
    });
  }

  @PluginMethod
  public void save(final PluginCall call) {
    final String data = call.getString("data");
    if (data == null) {
      call.reject("data required");
      return;
    }
    final long rev = call.getLong("rev", 0L), at = call.getLong("at", 0L);
    open(null, call, s -> {
      JSONObject mine = new JSONObject().put("rev", rev).put("at", at).put("data", data);
      if (!newer(mine, env(s))) { // the cloud already holds a newer valid Save: keep it
        client().discardAndClose(s);
        call.resolve(new JSObject().put("saved", false));
        return;
      }
      s.getSnapshotContents().writeBytes(mine.toString().getBytes(StandardCharsets.UTF_8));
      client().commitAndClose(s, new SnapshotMetadataChange.Builder().setDescription("GUILD24 rev " + rev).build())
          .addOnSuccessListener(m -> call.resolve(new JSObject().put("saved", true)))
          .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
    });
  }

  @PluginMethod
  public void clear(final PluginCall call) {
    open(null, call, s -> {
      s.getSnapshotContents().writeBytes(new byte[0]);
      client().commitAndClose(s, new SnapshotMetadataChange.Builder().setDescription("GUILD24 cleared").build())
          .addOnSuccessListener(m -> call.resolve())
          .addOnFailureListener(e -> call.reject(String.valueOf(e.getMessage())));
    });
  }
}
