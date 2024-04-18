// @ flow 
import { StyleSheet } from 'react-native';
import { POPPINSREGULAR } from '../../assets/css/styles';
import { responsiveFontSize} from 'react-native-responsive-dimensions';
import { COLOR } from '../../constants/GlobalConstants';

const { CMS_TEXT_COLOR } = COLOR;

const htmlStyles = StyleSheet.create({
	p: {    
        color:CMS_TEXT_COLOR,
        fontSize:responsiveFontSize(1.6),
        fontFamily : POPPINSREGULAR,
    },
    strong: {       
        color:CMS_TEXT_COLOR,
        fontSize:responsiveFontSize(1.6),
		fontFamily : POPPINSREGULAR
    },
    body: {      
        color:CMS_TEXT_COLOR,
        fontSize:responsiveFontSize(1.6),
		fontFamily : POPPINSREGULAR
    },
    a: {       
        color:CMS_TEXT_COLOR,
        fontSize:responsiveFontSize(1.6),
		fontFamily : POPPINSREGULAR
    },
    span : {
        color:CMS_TEXT_COLOR,
        fontSize:responsiveFontSize(1.6),
        fontFamily : POPPINSREGULAR,
    },
    a : {
        color:'#0056b3',
        fontSize:responsiveFontSize(1.6),
        fontFamily : POPPINSREGULAR,
    }
});

export default htmlStyles;
