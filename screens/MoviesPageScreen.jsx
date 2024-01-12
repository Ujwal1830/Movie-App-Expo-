import { View, Text, ScrollView, TouchableWithoutFeedback, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchGenreMovies, image185 } from '../api/moviesdb';
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

    console.log(data);

    const pages = Array.from({ length: data?.total_pages }, (_, index) => index);

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
            console.log("inside movies page screen",result);
            setData(result);
        }, 1000)
    }, [result])

    const ScrollToTheTop = React.useRef(null);
    
    const handlePageNo = async (pageNo) => {
        console.log(pageNo);
        try {
            const response = await fetchGenreMovies(title, pageNo);
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
            <Text className="text-white text-xl font-bold">{title} </Text>
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
                                            onPressIn={()=>{console.log(index);}}
                                        >
                                            <View className="space-y-1 mb-3">
                                                <Image className="rounded-3xl relative"
                                                    source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                                    style={{width: width*0.44, height: height*0.4}}
                                                />
                                                <View className="w-full pb-5 pt-2 px-1 flex-col items-center absolute bottom-0 bg-slate-950/80">
                                                    <Text className="text-neutral-300 ml-1 text-base text-center">
                                                        {item?.title?.length>22 ? item?.title+"...": item?.title}
                                                    </Text>
                                                    <Text className="text-yellow-600 ml-1 pr-1 text-xl">
                                                        {item?.vote_average?.toFixed(1)}
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
        <View className="mt-1" >
            <View className="mx-10 rounded-2xl overflow-hidden bg-white">
                <FlatList className=" overflow-hidden"
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
                                className={`justify-center items-center ${data.page === item+1 ? 'bg-[#404040]' : 'bg-white'} w-12 h-12 m-1 rounded-2xl `}>
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

  