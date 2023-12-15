namespace BotArm
{
    public interface IBluetoothConnector
    {
        Dictionary<string, string> ListConnectedDevices();
        void Connect(string deviceName);
        bool IsConnected();
        string GetConnectionDeviceDescription();
        void Disconnect();
        void Send(string message);
        void Send(MoveCommandsEnum moveCommand);



        delegate void ConnectionChangedHandler();

        event ConnectionChangedHandler ConnectionChanged;
    }
}
