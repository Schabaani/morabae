import {StyleSheet} from 'react-native';
import {normalize} from "../../components/helpers/sizeNormalizer";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    pickerWrapper: {
        paddingTop: normalize(10),
        borderRadius: normalize(10),
        width: normalize(265),
        height: '50%',
        backgroundColor: 'white',
        paddingLeft: normalize(20),
    }
});
