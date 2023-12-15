using System.Collections.ObjectModel;

namespace BotArm;

public partial class DeviceSelection : ContentPage
{
    private IBluetoothConnector connector;
    public ObservableCollection<KeyValuePair<string, string>> Devices { get; set; } = new ObservableCollection<KeyValuePair<string, string>>();

    public DeviceSelection()
	{
        InitializeComponent();
        
        connector = DependencyService.Get<IBluetoothConnector>();
        DevicesList.ItemsSource = Devices;

        ListConnectedDevices();
    }

    private void ListConnectedDevices()
    {
        var items = connector.ListConnectedDevices();

        items.Select(e => new KeyValuePair<string, string>(e.Key, e.Value)).ToList().ForEach(e => Devices.Add(e));
    }

    private void DevicesList_ItemSelected(object sender, SelectedItemChangedEventArgs e)
    {
        if (e?.SelectedItem == null)
        {
            if (connector.IsConnected())
                connector.Disconnect();

            return;
        }

        var item = (KeyValuePair<string, string>)e.SelectedItem;

        try
        {
            connector.Connect(item.Key);
            Navigation.PopAsync();
        }
        catch (Exception ex)
        {
            DisplayAlert("Error", ex.Message, "OK");
            DevicesList.SelectedItem = null;
        }
    }
}