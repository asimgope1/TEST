import { View, Text, Dimensions, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs'; 
import Share from 'react-native-share';
import { Button } from '@rneui/base';
import RNFetchBlob from 'rn-fetch-blob'

const Pdff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const targetPath = `${RNFS.DocumentDirectoryPath}/pdfff.pdf`; 
  const pdfUrl = `file://${targetPath}`; // PDF path

  const handleForward = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackward = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Share PDF',
        url: pdfUrl,
        failOnCancel: false,
      };

      const result = await Share.open(shareOptions);
      console.log('Share Result:', result);
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  const handleDownload = async () => {
    // try {
    //   const downloadPath = `${RNFS.DownloadDirectoryPath}/pdfff_downloaded.pdf`; // Path for downloaded file
    //   await RNFS.copyFile(targetPath, downloadPath);

    //   Alert.alert('Download Successful', `File downloaded to: ${downloadPath}`);
    // } catch (error) {
    //   console.error('Error downloading PDF:', error);
    //   Alert.alert('Download Failed', 'An error occurred while downloading the file.');
    // }

    const {config,fs}=RNFetchBlob;
    const fileDir=fs.dirs.DownloadDir;
    RNFetchBlob.config({
        fileCache:true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${fileDir}/pdfff_downloaded.pdf`,
          description: 'PDF File downloaded '
          
        },
      })
      .fetch('GET',pdfUrl,{

      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
      })
  };
  
  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Storage Permission Required',
  //         message:
  //           'This app needs access to your storage to download files.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );
  //     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //       Alert.alert('Permission Denied', 'Storage permission is required to download files.');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl }}
        style={styles.pdf}
        enablePaging={true}
        page={currentPage}
        onPageChanged={(page, totalPage) => {
          setCurrentPage(page);
          setTotalPage(totalPage);
        }}
        onError={(error) => console.error(error)}
        onLoadComplete={(numberOfPages) => {
          setTotalPage(numberOfPages);
        }}
        trustAllCerts={false}
        scale={1.0}
        minScale={0.5}
        maxScale={3.0}
      />

      <Text style={styles.pageInfo}>
        Page: {currentPage} / {totalPage}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Backward"
          onPress={handleBackward}
          disabled={currentPage === 1}
        />
        <Button color={'blue'} title="Share" onPress={handleShare} />
        <Button
          title="Forward"
          onPress={handleForward}
          disabled={currentPage === totalPage}
        />
      </View>

      <View style={styles.downloadContainer}>
        <Button color="green" title="Download PDF" onPress={handleDownload} />
      </View>
    </View>
  );  
};

export default Pdff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height * 0.8,
  },
  pageInfo: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    width: '100%',
  },
  downloadContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});
