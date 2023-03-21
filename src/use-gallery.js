import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const defaultAlbum = [
  {
    id: 1,
    title: '기본',
  },
];

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum[0]);
  const [albums, setAlbums] = useState(defaultAlbum);
  const [modalVisible, setModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      setImages([...images, newImage]);
    }
  };

  const deleteImage = (imageId) => {
    Alert.alert('이미지를 삭제하시겠습니까?', '', [
      {
        style: 'cancel', //스타일을 지정해서 이 버튼을 누르면 자동으로 alert 창 닫힘
        text: '아니요',
      },
      {
        text: '네',
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          setImages(newImages);
        },
      },
    ]);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };
    setAlbums([...albums, newAlbum]);
  };
  const selecetAlbum = (album) => {
    setSelectedAlbum(album);
  };
  const resetAlbumTitle = () => {
    setAlbumTitle('');
  };

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );
  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: '',
    },
  ];

  return {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    openDropdown,
    closeDropdown,
    isDropdownOpen,
    albums,
    selecetAlbum,
  };
};
