import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'

export default class TakePhoto extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync()
        }
    }

    render() {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    })
                                }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                            </TouchableOpacity>
                            <FontAwesome name="circle-thin" size={32} color="white" style={{ position: 'absolute', bottom: 20, left: 50 }} onPress={this.snap}></FontAwesome>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}