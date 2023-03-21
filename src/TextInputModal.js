import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';

export default ({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}) => {
  return (
    <Modal
      animationTupe="slide" //어떤 애니메이션으로 열릴것인가
      transparent={true} //백드롭 투명도
      visible={modalVisible} //모달 보이나 안보이나
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* 여백 누르면 닫히도록 */}
        <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
          {/* KeyboardAvoidingView 안에 flex:1 되어있어야 잘 작동함*/}
          <SafeAreaView
            style={{ width: '100%', position: 'absolute', bottom: 0 }}
          >
            <TextInput
              placeholder="앨범명을 입력해주세요"
              style={{
                width: '100%',
                padding: 10,
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: 'lightgrey',
              }}
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};
