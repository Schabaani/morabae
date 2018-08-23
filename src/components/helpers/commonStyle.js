import {StyleSheet} from 'react-native';
import {normalizeFont} from "../../components/helpers/sizeNormalizer";

export default StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        fontSize: normalizeFont(3),
    },
    buttonView: {
        height: 60,
        justifyContent: 'center'
    },
});
