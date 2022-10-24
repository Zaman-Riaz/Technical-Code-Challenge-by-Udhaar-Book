import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";


function List() {
  const apiURL = 'https://api.github.com/users';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const apiCall = async () => {
    try {
      let response = await fetch(apiURL);
      let actualData = await response.json();
      setData(actualData);
      setMasterData(actualData);
    }
    catch (error) {
      console.log('Error occured', error);
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

  const searchFilter = (text) => { 
      const newData  = masterData.filter (item => 
      item.login.toLowerCase().includes(text.toLowerCase()))
      if( newData.length > 0 ) { 
          setData(newData) 
      } 
      else {
          setData ( [ {'login': ' No data found '} ] )
      }

      setSearch(text) 
  }

  const ModalCall = () => {

    return (
      <View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalIsOpen}
          onBackdropPress={() =>
            setModalIsOpen(!modalIsOpen)
          }
        >

        <View>
          <View style={styles.modalView}>
            <Image
              style={styles.picture}
              source={{
                uri: modalData.avatar_url,
              }}
            />
            <Text style={styles.modalText}> Hello {modalData.login} !!!</Text>
            <Text style={styles.modalText}> Your Id: {modalData.id} </Text>
            <Text style={styles.modalText}> Account Type: {modalData.type} </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalIsOpen(!modalIsOpen)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>

        </Modal>

      </View>
    );
  }


  const onClick = (data) => {
    setModalData(data)
    setModalIsOpen(true)
  }

  return (

    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchSection}>
        <Icon name="search" size={16}
         style={styles.searchIcon} />
        <TextInput
          placeholder=" Search here"
          value={search}
          onChangeText={(text) => searchFilter(text)} 
        />
      </View>
   
      <ModalCall/>

      {/* Display data in a list */}
      <ScrollView>
        {
          data.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.mainContainer}
                onPress={() => { onClick(item) }}>
              <Image
                style={styles.picture}
                source={{ uri: item.avatar_url}}
              />
              <Text style={styles.item}> {item.login} </Text>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: '#badfda',
  },
  item: {
    fontSize: 17,
    textTransform: 'capitalize',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    margin: 4,
    padding: 5,
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 32
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    width: '60%',
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    margin: 5
  },
  picture: {
    margin: 5,
    flexDirection: 'row',
    borderRadius: 25,
    height: 50,
    width: 50
  }, 
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 12,
    borderColor: '#badfda',
    borderRadius: 40,
    marginTop: 4,
  },
  searchIcon: {
      padding: 15
  }
})


export default List