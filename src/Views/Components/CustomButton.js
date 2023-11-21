import { TouchableOpacity, Text} from "react-native";
import COLORS from "../../Const/colors";

//Componente botão para ter um padrão durante a aplicação

const Button = ({title, onPress = () => {}}) => {
    return(
        <TouchableOpacity 
            activeOpacity={0.5}
            onPress={onPress} 
            style={{height: 55, 
            backgroundColor: COLORS.black,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginVertical: 20,
            margin: 40
            }}>
                <Text 
                    style={{color: COLORS.white, 
                    fontWeight: '300', 
                    fontSize: 28,
                    }}>
                        {title}
                </Text>
        </TouchableOpacity>
    )
}

export default Button;