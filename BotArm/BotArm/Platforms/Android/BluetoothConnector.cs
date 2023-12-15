using Android.Bluetooth;
using Java.Util;
using System.Diagnostics;
using System.Text;
using static BotArm.IBluetoothConnector;

namespace BotArm.Platforms.Android
{
    public class BluetoothConnector : IBluetoothConnector
    {
        // -> this came from the official bluetooth doc. It means a serial connection. There are other types, such as audio, light etc...
        private const string uuidFormSerialBluetoothCommunication = "00001101-0000-1000-8000-00805f9b34fb";
        private BluetoothAdapter adapter;
        private BluetoothSocket socket;

        public Dictionary<string, string> ListConnectedDevices()
        {
            var result = new Dictionary<string, string>();
            adapter = BluetoothAdapter.DefaultAdapter;

            if (adapter?.IsEnabled == true)
                foreach (var item in adapter.BondedDevices)
                    result.Add(item.Address, GetDescription(item));

            return result;
        }



        public event ConnectionChangedHandler ConnectionChanged;



        public void Connect(string deviceAddress)
        {
            try
            {
                var device = adapter.BondedDevices.FirstOrDefault(d => d.Address == deviceAddress);
                socket = device.CreateRfcommSocketToServiceRecord(UUID.FromString(uuidFormSerialBluetoothCommunication));
                socket.Connect();
                ConnectionChanged?.Invoke();
            }
            catch
            {
                Disconnect();
                throw;
            }
        }

        public void Send(string message) 
        {
            if (socket == null)
                return;

            // -> its easier to read string in arduino
            //var bytes = BitConverter.GetBytes((int)moveCommand);
            var bytes = Encoding.ASCII.GetBytes(message);

            // -> I decided to wait the task, because that command is used in UI, and there is no bind for async event call for default
            socket.OutputStream.WriteAsync(bytes, 0, bytes.Length).Wait();
        }

        public void Send(MoveCommandsEnum moveCommand)
        {
            var message = ((int)moveCommand).ToString();
            Debug.WriteLine($"Message to send: {message}");
            Send(message);
        }

        public void Disconnect()
        {
            if (socket != null)
            {
                socket.Dispose();
                socket = null;

                ConnectionChanged?.Invoke();
            }
        }

        public bool IsConnected() => socket != null;

        public string GetConnectionDeviceDescription() => GetDescription(socket?.RemoteDevice);



        private static string GetDescription(BluetoothDevice item)
        {
            if(item == null)
                return null;

            var name = item.Name;

            if (string.IsNullOrEmpty(name))
                name = item.Alias;

            if (string.IsNullOrEmpty(name))
                name = item.Address;

            return name;
        }
    }
}
