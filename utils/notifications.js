import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('no se puedo hacer la  notificacion!');
        return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}

export async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Reminder",
            body: "Don't forget to log your attendance!",
        },
        trigger: { seconds: 3600, repeats: true },
    });
}
