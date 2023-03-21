import { Text, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const headerHeight = 50;

export default ({
  onPressHeader,
  selectedAlbum,
  onPressAddAlbum,
  isDropdownOpen,
  albums,
  onPressAlbum,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          style={{ marginLeft: 5 }}
          name={isDropdownOpen ? 'arrow-down' : 'arrow-up'}
          size={12}
          color="black"
        />
        {/* <SimpleLineIcons name="arrow-down" size={12} color="black" /> */}

        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: 'absolute',
            right: 0,
            height: headerHeight,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View
          style={{
            position: 'absolute',
            top: headerHeight,
            width: '100%',
            borderTopColor: 'lightgrey',
            borderTopWidth: 1,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}
        >
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;

            return (
              <TouchableOpacity
                key={`album-${index}`}
                onPress={() => onPressAlbum(album)}
                style={{
                  paddingVertical: 12,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? 'bold' : undefined }}
                >
                  {album.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
