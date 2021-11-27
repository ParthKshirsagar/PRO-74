import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';
import db from '../config';

export default class ReadStory extends React.Component{
    constructor(){
        super();
        this.state = {
            allStories: [],
            dataSource: [],
            search: ''
        }
    }

    componentDidMount(){
        this.retrieveStories()
      }
    
    updateSearch = search => {
        this.setState({ search });
    };
    
    retrieveStories=()=>{
        try {
            var allStories= [];
            var stories = db.collection("stories")
            .get().then((querySnapshot)=> {
                querySnapshot.forEach((doc)=> {
                    // doc.data() is never undefined for query doc snapshots
                    
                    allStories.push(doc.data())
                    console.log('this are the stories',allStories)
                })
                this.setState({allStories});
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    SearchFilterFunction(text) {
        const newData = this.state.allStories.filter((item)=> {

          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          dataSource: newData,
          search: text,
        });
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Header 
                    backgroundColor = {'orange'}
                    centerComponent = {{
                        text : 'Bed Time Stories',
                        style : { color: 'white', fontSize: 20, fontWeight: '900' }
                    }}
                />
                <View style={{height: 20, width: '100%'}}>
                    <SearchBar
                        style={{}}
                        placeholder='Type Here...'

                        onChangeText={(text) => {
                            this.SearchFilterFunction(text);
                        }}
                        value={this.state.search}
                    />
                </View>

                <FlatList
                    style={{marginTop: 45}}
                    data={this.state.search == '' ? this.state.allStories : this.state.dataSource}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text> Title: {item.title}</Text>
                            <Text> Author: {item.author}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index)=>{index.toString()}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    item: {
      backgroundColor: 'pink',
      padding:10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'pink',
      justifyContent:'center',
      alignSelf: 'center',
    }
  });