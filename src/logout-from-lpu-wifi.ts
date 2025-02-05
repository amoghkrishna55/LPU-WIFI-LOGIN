import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import axios from "axios";
import https from "https";

export default async function logoutFromLpuWifi() {
  const { username, password } = getPreferenceValues();

  await showToast({
    style: Toast.Style.Animated,
    title: "Logging out from LPU Wifi...",
  });

  const data = `mode=193&username=${username}%40lpu.com&loggedinuser=${username}%40lpu.com&logout=Logout`;

  try {
    const response = await axios.post("https://10.10.0.1/24online/servlet/E24onlineHTTPClient", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    await showToast({
      style: Toast.Style.Success,
      title: "Logout successful",
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to post",
    });
  }
}
