import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  Picker
} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import DialogInput from 'react-native-dialog-input';
import DateTimePicker from 'react-native-modal-datetime-picker';

const
BODY_COLOR = '#000022',
TEXT_MUTED = '#888888';

const constants = {
  BODY_COLOR, TEXT_MUTED,
};

const classes = {
  title: {
    color: 'red',
  }
};

let firstDate, secondDate, dates, result = [], matched_dates;

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'My Logs'
  };

  state = {
    logs: [],
    filter: "",
    isDialogVisible1: false,
    isDialogVisible2: false,
    flag: 0
  }

  componentDidMount = () => {
    fetch("https://my.api.mockaroo.com/timings.json?key=abafa720",{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((logs) => {
      this.setState({logs: logs});
          
    })
    .catch((error) => {
      console.error(error);
    });
  }

  filterLogs(type){       
    if(type == "Ascending"){

      this.state.logs.sort(function(a,b){ 
        return new Date(b.date) - new Date(a.date);
      });
    }else{

      this.state.logs.sort(function(a,b){ 
        return new Date(a.date) - new Date(b.date);
      });
    }
  }

  sendInput1(date){
    this.setState({isDialogVisible1: false});
    this.setState({isDialogVisible2: true});
    this.firstDate = date;
  }

  sendInput2(date){
    this.setState({isDialogVisible2: false});
    this.secondDate = date;
    console.log("firstDate : ",this.firstDate);
    console.log("secondDate : ",this.secondDate); 



    // var startDate = new Date(this.firstDate); 
    // var endDate = new Date(this.secondDate); 

    // var getDateArray = function(start, end) {
    //   var arr = new Array();
    //   var dt = new Date(start);
    //   while (dt <= end) {
    //     arr.push(new Date(dt));
    //     dt.setDate(dt.getDate() + 1);
    //   }
    //   return arr;
    // }

    // var dateArr = getDateArray(startDate, endDate);
   
    // var onlyDate = [];
    // this.matched_dates = [];


    // for(var i = 0 ; i < dateArr.length ; i++){
    //   onlyDate.push(dateArr[i].toISOString().slice(0,10));
    // }   

    // this.state.logs.map((items)=>{
    //   console.log("logs date",items.date);
    //   for(var i = 0 ; i < onlyDate.length ; i++){
    //     console.log("dates array",onlyDate[i])

    //     if(items.date == onlyDate[i]){
    //       this.matched_dates.push(onlyDate[i]);
    //     }

    //   }
    // })
    //   console.log("matched dates : ",this.matched_dates);
  }


  // getSelectedDatesArray(logs){   

  //  return logs.map((item)=>{  

  //     console.log("in selectedDates");
  //     console.log("items :", item);
           
      
  //     if(this.item.includes(this.matched_dates)){

  //       return (

  //         <View style = {[s.card]}>
  //         <View style = {[s.cardBody]}>

  //         <Text  style = {[s.text,s.h5]}>
  //         Date : {this.result[0]}
  //         </Text>

  //         <Text style = {[s.text,s.h5]}>
  //         In Time : {this.result[1]}
  //         </Text>

  //         <Text style = {[s.text,s.h5]}>
  //         Out Time : {this.result[2]}
  //         </Text>

  //         <Text style = {[s.text,s.h5]}>
  //         Total time present in office: {this.result[3]}
  //         </Text>
  //         </View>

  //         </View>
  //         );
  //     }else{

  //       return <Text> no logs found </Text>

  //     }
  //   })    
  // }

  makeListOfLogs(logs){   
    console.log("in list");
    return logs.map((item)=>{
      return (
        <View style = {[s.card]}>
        <View style = {[s.cardBody]}>

        <Text  style = {[s.text,s.h5]}>
        Date : {item.date}
        </Text>

        <Text style = {[s.text,s.h5]}>
        In Time : {item.inTime}
        </Text>

        <Text style = {[s.text,s.h5]}>
        Out Time : {item.outTime}
        </Text>

        <Text style = {[s.text,s.h5]}>
        Total time present in office: {item.totalTime}
        </Text>
        </View>

        </View>
        );
    })
  }

  _hideDateTimePicker = () => this.setState({ isDialogVisible1: false });
 
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };
 



  render() {

    return (
      <View>

      <View style={{flexDirection: 'row'}}>
      <Picker
      selectedValue={this.state.filter}
      style={{width: 200, height: 44,color: '#000000'}}
      itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17 }}
      onValueChange={(itemValue) =>
        this.setState({filter: itemValue})
      }>

      <Picker.Item label="Ascending" value="Ascending" />
      <Picker.Item label="Descending" value="Descending" />
      </Picker>

      <Button title = "select date" onPress={()=>{this.setState({isDialogVisible1: true})}}/>
      

       <View style={{ flex: 1 }}>
        
        <DateTimePicker
          isVisible={this.state.isDialogVisible1}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
      </View>


      {this.filterLogs(this.state.filter)}

     
        
        <ScrollView>
        {
          this.makeListOfLogs(this.state.logs)
        }
        </ScrollView>     

      </View>
      );
  }

}


