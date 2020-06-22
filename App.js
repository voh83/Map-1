import React, {useState} from 'react';
import { StyleSheet, Button, View, 
  Dimensions, Modal, Text, TextInput } from 'react-native';
import MapView, {Marker} from 'react-native-maps';


export default function App() {
  const [name,setName]=useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [markers,setMarkers]=useState([])
  const [tempLatLong, setTempLatLong]=useState({})
 
  const addName = (e)=>{
    console.log(e)
    setName(e)
  }

  const mapViewLongPressed=({nativeEvent})=>{
    setTempLatLong({coordinate:nativeEvent.coordinate, name:name})
    setModalVisible(true)
  }

  const addMarkers = () =>{
    setMarkers(markers.concat(tempLatLong))
    setModalVisible(false)
    setTempLatLong([])
  }

  const visible=()=>{
    setModalVisible(!modalVisible)
  }

    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          onLongPress={mapViewLongPressed}>
        </MapView>    
        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent={true}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nombre:</Text>
              <TextInput 
                style={styles.modalText}
                placeholder='Ingrese el nombre del punto'
                onChangeText={addName}>
              </TextInput>
              <View style={styles.buttonCtnr}>
                <Button style={styles.modalButton}
                  title="Modal Toggle"
                  onPress={visible}/>
                <Button style={styles.modalButton}
                  title="Agr Marker"
                  onPress={addMarkers}/>
              </View>

            </View>
          </View>
        </Modal> 
      </View>
  )
} 

const styles = StyleSheet.create({
  modalText:{
    fontSize:20,
    paddingBottom:10,
    paddingTop:10,
  },
  modalTitle:{
    fontSize:20,
  },
  modalContent:{
    backgroundColor:'white',
    width:300,
    height:150,
    alignItems:'stretch',
    justifyContent:'flex-end',
    padding:20,
  },
  buttonCtnr:{
    flexDirection:'row',
    justifyContent:'center'
  },
  modalButton:{
  },
  modal:{
    flex:1,
    alignItems:"center",
    justifyContent:'center',
  },
  map:{
    alignItems:'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
