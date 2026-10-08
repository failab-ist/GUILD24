param([string]$Name,[string]$TaskNode,[switch]$ProbeOnly)
$ErrorActionPreference='Stop'
if ($Name -notin @('potion0','potion1')) { throw '허용한 후보만 실행합니다.' }
Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class GuildJobProbe { [DllImport("kernel32.dll", SetLastError=true)] public static extern bool IsProcessInJob(IntPtr process, IntPtr job, out bool inJob); }'
$taskInJob=$false
$taskProcess=[System.Diagnostics.Process]::GetCurrentProcess()
$taskOk=[GuildJobProbe]::IsProcessInJob($taskProcess.Handle,[IntPtr]::Zero,[ref]$taskInJob)
@{ProbeOk=$taskOk;InJob=$taskInJob;Pid=$taskProcess.Id;Started=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath "$PSScriptRoot/$Name.job.json" -Encoding utf8
if (!$taskOk -or $taskInJob) { throw '실행 프로세스가 여전히 도구 종료관리 범위 안에 있습니다.' }
if (!$ProbeOnly) { & $TaskNode "$PSScriptRoot/launch.cjs" $Name; exit $LASTEXITCODE }
