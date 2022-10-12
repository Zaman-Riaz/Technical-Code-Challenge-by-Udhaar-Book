import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet }from 'react-native'


function App() {
    const apiURL = 'https://api.github.com/users';
    const [data, setData] = useState();  
  
    const apiCall = async () => {
      try {
        let response = await fetch(apiURL);
        let actualData = await response.json();
        setData(actualData);
        console.log(actualData)
      }
      catch (error) {
        console.log('Error occured', error);
      }
    }
  
    useEffect( () => {
      apiCall();
    }, []);
  
    return (
  
      <View>
        <Text>
          usersComponent
        </Text>
        {/* 
          <FlatList 
          data = {data}
          keyExtractor={({ id }, index) => id}
          renderItem = { ({ item }) => (
          <View>
            <Text> {item.login}, {item.id},
                  {item.node_id}, {item.avatar_url},
                  {item.gravatar_id}, {item.url},
                  {item.html_url}, {item.followers_url}, 
                  {item.following_url}, {item.gists_url}, 
                  {item.starred_url}, {item.subscriptions_url}, 
                  {item.organizations_url}, {item.repos_url}, 
                  {item.events_url}, {item.received_events_url}, 
                  {item.type}, {item.site_admin}
            </Text>
          </View>
          )} 
          />      
        */}

          {/* <List/> */}
          {/* <Search name='ahmed' /> */}
      </View>
      
    );
  }
  
  const styles= StyleSheet.create({
    container: {
      marginTop: 55,
      marginHorizontal: 10,
      borderRadius: 25,
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAF5EB',
    }
  })

  export default App