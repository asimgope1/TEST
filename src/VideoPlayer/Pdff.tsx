import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs'; 
import Share from 'react-native-share';



const Pdff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  // const bundledPdfPath = 'pdfff.pdf'; 
  const targetPath = `${RNFS.DocumentDirectoryPath}/pdfff.pdf`; 
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
      
      // const fileExists = await RNFS.exists(targetPath);
      // if (!fileExists) {
      //   console.log('Copying PDF from assets to Document Directory...');
      //   const assetPath = `${RNFS.DocumentDirectoryPath}/pdfff.pdf`;
      //   await RNFS.copyFileAssets(bundledPdfPath, targetPath); 
      // }

      const shareOptions = {
        title: 'Share PDF',
        url: `file://${targetPath}`, // Path to the copied PDF file
        failOnCancel: false,
      };

      // Open the share dialog
      const result = await Share.open(shareOptions);
      console.log('Share Result:', result);
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: `file://${targetPath}` }}
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
});
