using Microsoft.Extensions.Logging;

namespace TerminalBotTest
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

#if DEBUG
    		builder.Logging.AddDebug();
#endif

            DependencyService.Register<IBluetoothConnector, TerminalBotTest.Platforms.Android.BluetoothConnector>();

            return builder.Build();
        }
    }
}
