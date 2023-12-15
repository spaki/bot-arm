using BotArm.Platforms.Android;

namespace BotArm;

public partial class App : Application
{
    public App()
	{
        InitializeComponent();

		MainPage = new AppShell();
	}
}
