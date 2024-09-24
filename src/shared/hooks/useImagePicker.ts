import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useState} from 'react';
import {Alert} from 'react-native';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<Asset>();

  //카메라 앱 실행
  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo', //필수
      cameraType: 'back',
      includeExtra: true,
      saveToPhotos: true,
      quality: 1,
    };

    // 촬영 결과를 받아오는 callback
    launchCamera(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      else if (response.errorMessage) Alert.alert('Error : ' + response.errorMessage);
      else {
        if (response.assets != null) {
          const image = response.assets[0];
          if (!image?.uri) return null;

          const resizedImage = await ImageResizer.createResizedImage(image?.uri, 360, 360, 'JPEG', 100, 0, null, true);
          const {type, timestamp, id} = image;

          setSelectedImage({...resizedImage, type, timestamp, id});
        }
      }
    });
  };

  //사진앱 실행
  const openGallery = async () => {
    const option: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeExtra: true,
      maxHeight: 1000,
    };

    const response = await launchImageLibrary(option);

    if (response.didCancel) return;
    else if (response.errorMessage) Alert.alert('Error : ' + response.errorMessage);
    else if (response.assets) {
      const image = response.assets[0];
      if (!image?.uri) return null;

      const resizedImage = await ImageResizer.createResizedImage(image?.uri, 360, 360, 'JPEG', 100, 0, null, true);
      const {type, timestamp, id} = image;

      setSelectedImage({...resizedImage, type, timestamp, id});
    }
  };

  return {selectedImage, openCamera, openGallery};
};
