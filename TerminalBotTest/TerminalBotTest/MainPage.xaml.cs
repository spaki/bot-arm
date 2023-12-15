namespace TerminalBotTest
{
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
                DeviceLabel.Text = "Nenhum dispositivio selecionado";
            }
        }

        private async void SwitchDeviceClickedAsync(object sender, EventArgs e) => await Navigation.PushAsync(new DeviceSelection());

        private void SendCommandClicked(object sender, EventArgs e)
        {
            connector.Send(txtCommand.Text);
            DisplayAlert("Command", $"'{txtCommand.Text}' sent", "OK");
            txtCommand.Text = string.Empty;
        }

        private void SendTestCommandClicked(object sender, EventArgs e)
        {
            connector.Send(MoveCommandsEnum.Automatic);
            DisplayAlert("Command", $"'{MoveCommandsEnum.Automatic}' sent", "OK");
            txtCommand.Text = string.Empty;
        }
    }
}
