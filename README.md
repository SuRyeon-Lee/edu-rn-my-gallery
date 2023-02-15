## 🖼ImagePicker

- expo에서 제공. [사용법](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- 시스템의 이미지나 영상에 접근하고, 혹은 카메라로 직접 찍어서 프로젝트에 직접 띄울 수 있게 전달까지 해주는 라이브러리

```js
npx expo install expo-image-picker
```

- 아래와 같은 경고가 뜨는데, cancelled를 사용하지 않았는데 떠서 의문이었다. 근데 미리 경고해주는 역할을 하는 것이었다. 무시하면 된다고..

```bash
Image picker continues to throw warning: Key "cancelled" in the image picker result is deprecated, use "canceled" instead
```
