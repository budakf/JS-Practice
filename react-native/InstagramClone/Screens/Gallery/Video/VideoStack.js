import { createStackNavigator } from 'react-navigation-stack';
import VideoScreen from './VideoScreen'


export default VideoStack = createStackNavigator( 
    {
        VideoScreen: {
            screen: VideoScreen,
        }
    }, 
)