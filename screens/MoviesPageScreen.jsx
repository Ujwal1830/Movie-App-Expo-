import { View, Text, ScrollView, TouchableWithoutFeedback, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchGenrePageNo, image185 } from '../api/moviesdb';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { FlatList } from 'react-native';


const {width, height} = Dimensions.get('window');
const ios = Platform.OS ==  'ios'
const topMargin = ios? '' : 'mt-3'

export default function MoviesPageScreen() {

    const {title, result} = useRoute().params;
    const [loading, setLoading] = useState(true);
    const [isFav, setIsFav] = useState(true);
    const navigator = useNavigation();
    const [data, setData] = useState([]);

    const pages = Array.from({ length: data?.total_pages }, (_, index) => index);

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
            setData(result);
        }, 1000)
    }, [result])

    const ScrollToTheTop = React.useRef(null);
    
    const handlePageNo = async (pageNo) => {
        console.log(pageNo);
        try {
            const response = await fetchGenrePageNo(title, pageNo);
            setData(response);
            setLoading(false);
            ScrollToTheTop.current?.scrollTo({
                    y: 0,
                    animated: true,
                });
            
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

  return (
    <SafeAreaView className="bg-black flex-1 ">
        <View className={`mb-5 w-full flex-row justify-between items-center px-4 ${topMargin}`}>
            <TouchableOpacity onPress={()=>navigator.goBack()} className='rounded-xl w-8 justify-center items-center'>
                <ChevronLeftIcon size={'30'} color={'white'} strokeWidth={'2.5'} />
            </TouchableOpacity>
            <Text className="text-white text-3xl font-bold">{title} </Text>
            <View className="w-6">
                {/* <HeartIcon size={'30'} color={isFav ? theme.background : 'white'} /> */}
                <Text className=" text-xl">{data.page}</Text>
            </View>
        </View>
        {
            loading ? (
                <Loading />
            ) : (
            data.results?.length > 0 ? (
                    <ScrollView ref={ScrollToTheTop}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        className="space-y-3"
                    >
                        <View className="flex-row justify-between flex-wrap">
                            {
                                data.results.map((item, index) =>{
                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={()=>{navigator.push("Movie", item)}}
                                        >
                                            <View className="space-y-1 mb-3">
                                                <Image className="rounded-3xl"
                                                    source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                                    style={{width: width*0.44, height: height*0.3}}
                                                />
                                                <View className="flex-row justify-between">
                                                    <Text className="text-neutral-300 ml-1 pl-1">
                                                        {item?.title?.length>22 ? item?.title?.slice(0,17)+"...": item?.title}
                                                    </Text>
                                                    <Text className="text-yellow-600 ml-1 pl-1">
                                                        {item?.vote_average}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>

                        

                    </ScrollView>
                ) : (
                    <View className="flex-row justify-center">
                        <Image className="h-96 w-96"
                            source={require('../assets/images/movieTime.png')}
                        />
                    </View>
                )
            )
        }
        <View className="mb-1 mt-1" >
            <View className="mx-10 rounded-full overflow-hidden">
                <FlatList className="rounded-full overflow-hidden"
                    data={pages}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={()=>{
                                setLoading(true);
                                setTimeout(() => {
                                    handlePageNo(item+1);
                                }, 1000);
                            }}
                        >
                            
                            <View 
                                style={{ shadowOffset: { width: "20px", height: "20px" },
                                shadowColor: 'black',
                                shadowOpacity: 0.5,
                                shadowRadius: 20,
                                elevation: 5, }}
                                className={`justify-center items-center ${data.page === item+1 ? 'bg-[#404040]' : 'bg-white'} w-12 h-12 m-1 rounded-full `}>
                                <Text className={`text-xl ${data.page === item+1 ? 'text-white' : 'text-black'}`}>{item+1}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

            </View>
        </View>
    </SafeAreaView>
  )
}

  