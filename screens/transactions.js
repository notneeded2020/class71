import React, {Component} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions"
import db from "../config"

export default class Transactions extends Component {

    constructor(){
        super()
        this.state ={
            hasCameraPermissions: null,
            scan: false,
            scanData: "",
            btnState: "normal",
            scanBookId:"",
            scanStudentId:""
        }
    }

    getCameraPermission = async(ID)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
        hasCameraPermissions: status === "granted",
        btnState:ID,
        scan:false
    })
    }

    handleBarCodeScanned = async({type,data})=>{
        this.setState({
            scan : true,
            scanData : data,
            btnState: "normal"
        })
    }

    handleTransaction = async() =>{
       var transactionMsg 
       db.collection("Book").doc(this.state.scanBookId).get() 
       .then((doc)=>{
         var book = doc.data()
         if(book.bookAvailability){
           this.initiateBookIssue()
           transactionMsg = "book issued"
         }
         else{
           this.initiateBookReturn()
           transactionMsg = "book returned"
         }
         console.log(doc.data())
       })     
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scan = this.state.scan 
        const btnState = this.state.btnState

         if (btnState != "normal" && hasCameraPermissions){

        return(
            <BarCodeScanner 
            onBarCodeScanned = {scan ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            /> 
           )
        } 
         else if(btnState === "normal"){
            return(
            <View style={styles.container}>

                <View>
                <Image 
                source={require("../assets/booklogo.jpg")}
                style={{width:100,height:100}}
                />

                <Text style={{textAlign:"center", fontSize:20}}>WiLy</Text>
                </View>

                <View style={styles.inputView}>
                
                <TextInput 
                placeholder = "Book ID"
                value = {this.state.scanBookId} 
                // keyboardType = "numeric"
                // maxLength = {10}
                // secureTextEntry = {true}
                style={styles.inputBox}
                />

                <TouchableOpacity 
                style={styles.scanbtn}
                onPress={()=>{
                    this.getCameraPermission("bookID")
                }}
                > 
                  <Text style={styles.buttonText}> Scan </Text>
                </TouchableOpacity>

                </View>


                <View style={styles.inputView}>

                <TextInput 
                placeholder = "Student ID" 
                value= {this.state.scanStudentId}
                style={styles.inputBox}
                />

                <TouchableOpacity style={styles.scanbtn}>  
                 <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>

                </View>

                <View>

                 <TouchableOpacity 
                 style={styles.submitbtn}
                 onPress={async()=>{
                   this.handleTransaction()
                 }}
                 >
                  <Text style={styles.buttonText}>Submit</Text>
                 </TouchableOpacity>

                </View>



                {/* <Text>
                    {hasCameraPermissions === true ? this.state.scanData:""}
                </Text>

                <TouchableOpacity style={styles.scanbtn} 
                  onPress={this.getCameraPermission}> 
                    Scan QR code of book
                </TouchableOpacity> */}



            </View>
        )
       }
    }
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanbtn:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanbtn:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitbtn:{
      backgroundColor: '#66BB6A',
      width: 80,
      borderWidth: 2,
    }
  });