import React from 'react';
import { View, StyleSheet, ToastAndroid, PermissionsAndroid, Platform, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import WebView from 'react-native-webview';

const PdfDownload = () => {

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download files.',
          buttonPositive: 'OK', // Added buttonPositive property
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission request error:', error);
      ToastAndroid.show(
        'Failed to request storage permission.',
        ToastAndroid.LONG
      );
      return false;
    }
  };

  const handleFileDownload = async (url) => {
    Alert.alert(
      'Download Confirmation',
      `Are you sure you want to download this file?\n\n${url}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: async () => {
            console.log('Download URL:', url);
            try {
              const hasPermission = await requestStoragePermission();
              if (!hasPermission) {
                ToastAndroid.show(
                  'Permission denied. Unable to download the file.',
                  ToastAndroid.LONG
                );
                return;
              }

              // Extract the file name and set the download path
              const fileName = url.split('/').pop();
              const downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

              console.log('Download path:', downloadPath);

              // Start downloading the file
              const downloadResult = await RNFS.downloadFile({
                fromUrl: url,
                toFile: downloadPath,
              }).promise;

              if (downloadResult.statusCode === 200) {
                ToastAndroid.show(
                  `File downloaded successfully to: ${downloadPath}`,
                  ToastAndroid.LONG
                );
                Alert.alert('Download Complete', `The file has been downloaded to: ${downloadPath}`);
              } else {
                ToastAndroid.show(
                  'Failed to download file. Please try again later.',
                  ToastAndroid.LONG
                );
              }
            } catch (error) {
              console.error('Download error:', error);
              ToastAndroid.show(
                'An error occurred while downloading the file.',
                ToastAndroid.LONG
              );
            }
          },
        },
      ]
    );
  };

  const handleShouldStartLoadWithRequest = (event) => {
    const { url } = event;
    console.log('Intercepting URL:', url);

    // Check if it's a download link (PDF or other files)
    // const downloadExtensions = ['.pdf', '.jpg', '.png', '.zip', '.txt'];
    // if (downloadExtensions.some(extension => url.toLowerCase().endsWith(extension))) {
      console.log('Download link detected:', url); // Log detected download link
      handleFileDownload(url); // Handle the download
      // return false; // Prevent WebView from navigating to the download link
    // }

    // If it's not a download link, allow navigation to the URL
    console.log('Navigating to URL:', url);
    return true; // Allow WebView to load the URL
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.google.co.in/' }} // Change this to your URL containing download links
        style={styles.webview}
        allowsBackForwardNavigationGestures={true}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest} // Intercept download links
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        autoManageStatusBarEnabled={true}
        setSupportMultipleWindows={false}
        enableApplePay={false}
        forceDarkOn={false}
        minimumFontSize={1}
        downloadingMessage="Downloading your file..."
        lackPermissionToDownloadMessage="Unable to download files. Please enable storage permission."
        allowsProtectedMedia={true}
        fraudulentWebsiteWarningEnabled={true}
        webviewDebuggingEnabled={true}
        menuItems={[
          { label: 'Tweet', key: 'tweet' },
          { label: 'Save for Later', key: 'saveForLater' },
        ]}
        suppressMenuItems={['copy', 'share']}
        textInteractionEnabled={true}
        refreshControlLightMode={false}
        ignoreSilentHardwareSwitch={false}
        basicAuthCredential={{
          username: 'exampleUser',
          password: 'securePassword',
        }}
        limitsNavigationsToAppBoundDomains={true}
        useWebView2={true} // For Windows platform
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('HTTP error: ', nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PdfDownload;
