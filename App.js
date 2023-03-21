import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useGallery } from './src/use-gallery';
import MyDropDownFilter from './src/MyDropDownFilter';
import TextInputModal from './src/TextInputModal';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;

export default function App() {
  const {
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
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressAddAlbum = () => {
    openModal();
  };
  const onSubmitEditing = () => {
    if (!albumTitle) return;

    //1. 앨범에 타이틀 추가
    addAlbum();
    //2. 모달 닫기 & TextInput에 value 초기화
    closeModal();
    resetAlbumTitle();
  };
  const onPressBackdrop = () => {
    closeModal();
  };
  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const onPressAlbum = (album) => {
    selecetAlbum(album);
    closeDropdown();
  };

  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: 'lightgrey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '100', fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPressImage={() => onLongPressImage(id)}>
        <Image
          key={id}
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* //horizontal을 사용하면 3개 넘어가도 가로로 쌓여서 스크롤 되는 형태가 되어버림 */}

      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownFilter
        onPressHeader={onPressHeader}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        isDropdownOpen={isDropdownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        modalVisible={modalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressBackdrop}
      />

      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
});
