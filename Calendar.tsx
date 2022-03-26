import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TimePickerModal } from 'react-native-paper-dates';
import { Ionicons } from '@expo/vector-icons';
import StyledButton from './StyledButton';
import C from '../constants/mainColors';
import FontStyles from '../constants/mainTextFormats';
import M from '../constants/monthList';
import W from '../constants/weekDaysList';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.04);
const WINDOW_WIDTH = Dimensions.get('window').width;
const CAPTURE_WIDTH = Math.floor(WINDOW_WIDTH * 0.806);

const Calendar = props => {
  //-----------------------------------------------------------
  // Hooks for the attributes
  // open => It opens or closes the itemlist
  // value => It contains the value of the selected item
  // items => It is used to collect the item data and graph it
  const [selectedDate, setSelectedDate] = useState((new Date(Date.now()).toDateString()).toString());
  const [selectedTime, setSelectedTime] = useState(`${new Date().getHours()<10?'0':''}${new Date().getHours()}:${new Date().getMinutes()<10?'0':''}${new Date().getMinutes()}`);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [dateSelectionLayout, setDateSelectionLayout] = useState(false);
  const [timeSelectionLayout, setTimeSelectionLayout] = useState(false);
  const [pickerMode, setPickerMode] = useState(null);
  //-----------------------------------------------------------
  // Functions to assign data to Hooks
  const changingDate = (date) => {
    if(Platform.OS !== "web"){
        const timeStampValue = (new Date(date).toDateString()).toString();
        const timeStampValue2 = new Date(`${(new Date(date).toDateString())} ${selectedTime}:00`).toString();
        setSelectedDate(timeStampValue);
        setSelectedDateTime(timeStampValue2);
        handleChange(timeStampValue2);
        console.log(timeStampValue, timeStampValue2);
    }
    else{
        const timeStampValue = (new Date(date._i.year, date._i.month, date._i.day, date._i.hour, 0, 0).toDateString()).toString();
        const timeStampValue2 = new Date (`${(new Date(date._i.year, date._i.month, date._i.day, date._i.hour, 0, 0).toDateString())} ${selectedTime}:00`).toString();
        setSelectedDate(timeStampValue);
        setSelectedDateTime(timeStampValue2);
        handleChange(timeStampValue2);
        console.log(timeStampValue, timeStampValue2);
    }
    /*
    setTimeout(function(){
        setDateSelectionLayout(false);
        //setTimeSelectionLayout(true);
    }, 500);
    */
  };
  const onDismiss = () => {
    setTimeout(function(){
        setTimeSelectionLayout(false);
    }, 300);
  };
  const onConfirm = (hours, minutes) => {
    setTimeout(function(){
        const timeStampValue = `${(hours<10)? "0": ""}${hours}:${(minutes<10)? "0": ""}${minutes}`;
        const timeStampValue2 = new Date(`${selectedDate} ${(hours<10)? "0": ""}${hours}:${(minutes<10)? "0": ""}${minutes}`).toString();
        setSelectedTime(timeStampValue);
        setSelectedDateTime(timeStampValue2);
        handleChange(timeStampValue2);
        setTimeSelectionLayout(false);
    }, 500);
    console.log(`${(hours<10)? "0": ""}${hours}:${(minutes<10)? "0": ""}${minutes}`);
  };
  const calculatingDate = (date) =>{
    const dateFormat = new Date(date);
    const weekDay = dateFormat.getDay();
    const month = dateFormat.getMonth();
    const dayOfTheMonth = dateFormat.getDate();
    const year = dateFormat.getFullYear();
    return `${W[weekDay].sp}, ${dayOfTheMonth} de ${M[month].sp} de ${year}`
  }
  useEffect(() => {
    console.log(selectedDateTime);
  }, [selectedDateTime]);
  const hidePicker = () => {
    setTimeout(function(){
      setPickerMode(null);
      setTimeSelectionLayout(false);
    }, 300);
  };
  const handleConfirm = (date) => {
    // In order to prevent the double-shown popup bug on Android, picker has to be hidden first (https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550)
    setTimeout(function(){
      const hours = new Date(date).getHours();
      const minutes = new Date(date).getMinutes();
      const timeStampValue = `${(hours<10)? "0": ""}${hours}:${(minutes<10)? "0": ""}${minutes}`;
      const timeStampValue2 = new Date(`${selectedDate} ${(hours<10)? "0": ""}${hours}:${(minutes<10)? "0": ""}${minutes}`).toString();
      setSelectedTime(timeStampValue);
      setSelectedDateTime(timeStampValue2);
      handleChange(timeStampValue2);
      setPickerMode(null);
      setTimeSelectionLayout(false);
      //hidePicker();
      //console.log(date);
      //console.log(new Date(date).getHours());
      console.log(`${(hours<10)? "0": ""}${hours}:${(minutes<10)? "0": ""}${minutes}`);
    }, 500);
    //console.warn("A date has been picked: ", date);
  };
  //Function to change the prop => onSelect
  const handleChange = (e) => {
    props.onSelect(e)
  };
  //---------------------------------------------------
  // Rendering the component ...
    return (
      <View style={styles.container}>
        <View style = {{backgroundColor: C.blueLogo, width: props.width, alignSelf: 'center', alignItems: 'center'}}>
          <Text style = {{fontFamily: 'CerealBook', fontSize: 55, lineHeight: 64, letterSpacing: -0.408, color: C.whitePrimary}}>{selectedTime}</Text>
          <Text style = {[FontStyles.body, {color: C.whitePrimary, marginBottom: 8}]}>{calculatingDate(selectedDate)}</Text>
        </View>
        <View style={{height: 16}}></View>
        <TouchableOpacity style={[(dateSelectionLayout === true)? styles.container2: styles.container3, {width: props.width, justifyContent: 'center'}]} onPress={()=> setDateSelectionLayout(!dateSelectionLayout)}>
            <Text style={[FontStyles.bodyBold, {color: C.whitePrimary, textAlignVertical: 'center'}]}>Seleccione la fecha</Text>
        </TouchableOpacity>
        <View style={{height: 12}}></View>
        {(dateSelectionLayout=== true)&&
        <View style={{backgroundColor: C.whitePrimary, justifyContent: 'center'}}>
          <CalendarPicker
          onDateChange={(e)=>changingDate(e)}
          weekdays={['Dom','Lun','Mar','Mie','Jue','Vie','Sab']}
          months={['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']}
          showDayStragglers={true}
          previousTitle={'Anterior'}
          nextTitle={'Siguiente'}
          previousTitleStyle={{color: C.blueLogo}}
          nextTitleStyle={{color: C.blueLogo}}
          previousComponent={<Ionicons name="chevron-back-circle" size={25} color={C.blueLogo}/>}
          nextComponent={<Ionicons name="chevron-forward-circle" size={25} color={C.blueLogo}/>}
          selectedDayColor={C.blueLogo}
          selectedDayStyle={{borderRadius: 10, backgroundColor: C.blueLogo, shadowColor: C.greyLogo, shadowRadius: 5, elevation: 3, shadowOffset: {width: 0, height: 2}}}
          selectedDayTextColor={C.whitePrimary}
          width={props.width}
          height={props.height}
          />
          <View style={{height: 8}}></View>
          <TouchableOpacity style={[styles.container2, {width: props.width, justifyContent: 'center'}]} onPress={() => setDateSelectionLayout(false)}>
            <Text style={[FontStyles.bodyBold, {color: C.whitePrimary, textAlignVertical: 'center'}]}>Confirmar</Text>
          </TouchableOpacity>
        </View>
        }
        <View style={{height: 8}}></View>
        <TouchableOpacity style={[(timeSelectionLayout === true)? styles.container2: styles.container3, {width: props.width, justifyContent: 'center'}]} onPress={()=> {
          setTimeSelectionLayout(!timeSelectionLayout);
          if(timeSelectionLayout === true){
            setPickerMode(null);
          }
          else{
            setPickerMode("time");
          }
          }}
        >
            <Text style={[FontStyles.bodyBold, {color: C.whitePrimary, textAlignVertical: 'center'}]}>Seleccione la hora</Text>
        </TouchableOpacity>
        <View style={{height: 12}}></View>
        {(Platform.OS === 'web')?
        <TimePickerModal
        visible={timeSelectionLayout}
        onDismiss={onDismiss}
        onConfirm={(e)=>onConfirm(e.hours, e.minutes)}
        hours={12} // default: current hours
        minutes={0} // default: current minutes
        label="Seleccione la hora" // optional, default 'Select time'
        uppercase={true} // optional, default is true
        cancelLabel="Cancelar" // optional, default: 'Cancel'
        confirmLabel="Confirmar" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale="en" // optional, default is automically detected by your system
        />
        :
        <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        display={undefined}
        />
        }
        <View style={{height: 16}}></View>
      </View>
    );
}
export default Calendar;
//-------------------------------------------------------------------
// Default props for the component
Calendar.defaultProps = {
    height: 300,
    width: 300
};
//-------------------------------------------------------------------
// StyleSheet for the components that were used 
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: C.greyLow,
    //marginTop: 16,
  },
  container2: {
    height: 32,
    backgroundColor: C.blueLogo,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  container3: {
    height: 32,
    backgroundColor: C.greyLogo,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
});