namespace BotArm;

public partial class MainPage : ContentPage
{
    private IBluetoothConnector connector;

    public MainPage()
	{
		InitializeComponent();

        connector = DependencyService.Get<IBluetoothConnector>();
        connector.ConnectionChanged += ConnectionChanged;
        ConnectionChanged();
    }



    private void ConnectionChanged()
    {
        if (connector.IsConnected())
        {
            ControlsPanel.Opacity = 1;
            DeviceLabel.Text = connector.GetConnectionDeviceDescription();
        }
        else
        {
            ControlsPanel.Opacity = 0.2;
            DeviceLabel.Text = "No device selected";
        }
    }



    private void UpPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Up);

    private void DownPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Down);

    private void RighPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Right);

    private void LeftPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Left);



    private void FrontPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Front);

    private void BackPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Back);

    private void ClosePressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.CloseHand);

    private void OpenPressed(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.OpenHand);



    private void AutomaticClicked(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Automatic);

    private void ButtonReleased(object sender, EventArgs e) => connector.Send(MoveCommandsEnum.Pause);



    private async void SwitchDeviceClickedAsync(object sender, EventArgs e) => await Navigation.PushAsync(new DeviceSelection());
}

