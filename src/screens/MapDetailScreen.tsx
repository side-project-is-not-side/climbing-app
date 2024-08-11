import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapRoute } from '@shared/constants';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'


const MapDetailScreen = () => {
  const route = useRoute<RouteProp<MapRoute, 'detail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<MapRoute>>();


  const {id} = route.params;

  return (
    <ScrollView><Text>MapNavigation</Text></ScrollView>
  )
}

export default MapDetailScreen