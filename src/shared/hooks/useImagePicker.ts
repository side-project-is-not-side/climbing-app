import {useState} from 'react';
import {Alert} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

type Props = {
  onSelectImage?: (assets: Asset[]) => void;
  onCancelCamera?: () => void;
  onCancelGallery?: (asset: Asset | undefined) => void;
};

export const useImagePicker = (props: Props = {}) => {
  const {
    onSelectImage = () => {},
    onCancelCamera = () => {},
    onCancelGallery = () => {},
  } = props;
  const [selectedImage, setSelectedImage] = useState<Asset>();

  //카메라 앱 실행
  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo', //필수
      cameraType: 'back',
      includeExtra: true,
      saveToPhotos: true,
      quality: 1,
      videoQuality: 'high',
    };

    // 촬영 결과를 받아오는 callback
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) return onCancelCamera();
      else if (response.errorMessage)
        Alert.alert('Error : ' + response.errorMessage);
      else {
        if (response.assets != null) {
          const uri = response.assets[0].uri; //assets 여러개가 올수 있는데 중에 0번방 거

          const souce = {uri: uri};

          setSelectedImage(souce);
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

    if (response.didCancel) return onCancelGallery(selectedImage);
    else if (response.errorMessage)
      Alert.alert('Error : ' + response.errorMessage);
    else if (response.assets) {
      onSelectImage(response.assets);
      setSelectedImage(response.assets[0]);
    }
  };

  return {selectedImage, openCamera, openGallery};
};
