using Android.App;
using Android.Runtime;
using BotArm.Platforms.Android;

namespace BotArm;

[Application]
public class MainApplication : MauiApplication
{
	public MainApplication(IntPtr handle, JniHandleOwnership ownership)
		: base(handle, ownership)
	{
        DependencyService.Register<IBluetoothConnector, BluetoothConnector>();
    }

    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
