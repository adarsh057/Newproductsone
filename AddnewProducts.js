import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';
import Cookies from 'js-cookie'
import axios from "axios";
let jwtToken = "";
class AddnewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: null,
      selectedPerSFT: null,
      selectedProduct: null,
      selectedBrand: null,
      selectedInstallationtime: null,
      selectedMaterial: null,
      selectedColor: null,
      selectedSpacetype: null,
      selectedUsage: null,
      attachname: null,
      quantity: '',
      productPrice: '',
      tax: '',
      taxStatus:'',
      TextInputone: '',
      TextInputtwo: '',
      TextInputthree: '',
      TextInputfour: '',
      Width: '',
      Length: '',
      Thickness: '',
      size: '',
      image: null,
      imageName: '',
      sqFeets:'',
      title: "",
    titleErrorMessage: "",
    titleStatus: false,
    Tags:"",
    TagsStatus:false,
    width: "",
    widthStatus:false,
    length: "",
    lengthStatus:false,
    thickness: "",
    thicknessStatus:"",
    description: "",
    descriptionStatus: false,
    fettInput: "",
    fettInputStatus:false,
    productType: "",
    productTypeStatus:false,
    brand: "",
    brandStatus:false,
    Installationtime:"",
    InstallationtimeStatus:false,
    sqFeets: "",
    productColor: "",
    productColorStatus:false,
    material: "",
    materialStatus:false,
    selectType: "",
    spaceType: "",
    spaceTypeStatus:false,
    usage: "",
    usageStatus:false,
    qty: "",
    price: "",
    priceStatus:false,
    tax: "",
    taxStatus:false,
    noOfDays: "",
    noOfDaysStatus:false,
    shippingCharges: "",
    materialsArray: [],
    selectedImages: [],
    productImages: [],
    imageSelectionError: false,
    };
    this.serviceItems = [
      { label: 'Brand 1', value: 'item1' },
      { label: 'Brand 2', value: 'item2' },
      { label: 'Brand 3', value: 'item3' },
    ];
    this.Product = [
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Wood', value: 'Wood' },
      { label: 'Electrical', value: 'Electrical' },
      { label: 'Titles', value: 'Titles' },
      { label: 'Wallpapers', value: 'Wallpapers' },
      { label: 'Paint', value: 'Paint' },
      { label: 'Sanitary', value: 'Sanitary' },
    ];
    this.Brand = [
      { label: 'Brand 1', value: 'Brand 1' },
      { label: 'Brand 2', value: 'Brand 2' },
      { label: 'Brand 3', value: 'Brand 3' },
      { label: 'Brand 4', value: 'Brand 4' },
      { label: 'Brand 5', value: 'Brand 5' },
    ];
    this.Installationtime = [
      { label: '5 days', value: '5 days' },
      { label: '10 days', value: '10 days' },
      { label: '15 days', value: '15 days' },
    ];
    this.Material = [
      { label: 'Wood', value: 'Wood' },
      { label: 'Steel', value: 'Steel' },
      { label: 'Glass', value: 'Glass' },
    ];
    this.Color = [
      { label: 'Black', value: 'Black' },
      { label: 'Blue', value: 'Blue' },
      { label: 'White', value: 'White' },
    ];
    this.Spacetype = [
      { label: 'Residential', value: 'Residential' },
      { label: 'Commercial', value: 'Commercial' },
  ];
    this.Usage = [
      { label: 'Indoor', value: 'Indoor' },
      { label: 'Outdoor', value: 'Outdoor' },
     ];
    this.perSFTItems = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];
  }
  componentDidMount = () => {
    jwtToken = Cookies.get("vendorToken");
    this.materialFunction();
  };

  materialFunction = async () => {
    const apiUrl = "http://localhost:9000/material";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    };
    try {
      const materialResponse = await fetch(apiUrl, options);
      const materialData = await materialResponse.json();
      console.log(materialData);
      if (materialResponse.ok === true) {
        this.setState({ materialsArray: materialData });
      }
    } catch (error) {
      console.error(error);
    }
  };
  onChangeSelectedItem = (itemValue) => {
    this.setState({ selectedItem: itemValue });
  };
  onChangeValues = (name, value) => {
    this.setState({ [name]: value });
    if (name === 'productType') {
      this.setState({ productType: value });
    } else {
      this.setState({ [name]: value });
    }
    if (name === 'title') {
      this.setState({ titleStatus: false });
      }
    else {
      this.setState({ titleStatus: false });
    }
    if (name === 'description') 
    {
      this.setState({ descriptionStatus: false });
      
    } else {
      this.setState({ descriptionStatus: false });
    }
    if (name === 'Tags')
    {
      this.setState({TagsStatus:false});
    }
    else{
      this.setState({TagsStatus:false});
    }
    if(name === 'productType')
    {
      this.setState({productTypeStatus:false});
    }
    else{
      this.setState({productTypeStatus:false});
    }
    if(name === 'brand')
    {
      this.setState({brandStatus:false});
    }
    else{
      this.setState({brandStatus:false});
    }
    if(name === 'Installationtime')
    {
      this.setState({InstallationtimeStatus:false});
    }
    else{
      this.setState({InstallationtimeStatus:false});
    }
    if(name === 'noOfDays')
    {
      this.setState({noOfDaysStatus:false});
    }
    else{
      this.setState({noOfDaysStatus:false});
    }
    if(name === 'width')
    {
      this.setState({widthStatus:false});
    }
    else{
      this.setState({widthStatus:false});
    }
    if(name === 'length')
    {
      this.setState({lengthStatus:false});
    }
    else{
      this.setState({lengthStatus:false});
    }
    if(name === 'thickness')
    {
      this.setState({thicknessStatus:false});
    }
    else{
      this.setState({thicknessStatus:false});
    }
    if(name === 'fettInput')
    {
      this.setState({fettInputStatus:false});
    }
    else{
      this.setState({fettInputStatus:false});
    }
    if(name === 'material')
    {
      this.setState({materialStatus:false});
    }
    else{
      this.setState({materialStatus:false});
    }
    if(name === 'productColor')
    {
      this.setState({productColorStatus:false});
    }
    else{
      this.setState({productColorStatus:false});
    }
    if(name === 'spaceType')
    {
      this.setState({spaceTypeStatus:false});
    }
    else{
      this.setState({spaceTypeStatus:false});
    }
    if (name === 'usage')
    {
      this.setState({usageStatus:false});
    }
    else{
      this.setState({usageStatus:false});
    }
    if (name === 'qty')
    {
      this.setState({qtyStatus:false});
    }
    else{
      this.setState({qtyStatus:false});
    }
    if (name === 'price')
    {
      this.setState({priceStatus:false});
    }
    else{
      this.setState({priceStatus:false});
    }
    if(name === 'tax')
    {
      this.setState({taxStatus:false});
    }
    else{
      this.setState({taxStatus:false});
    }
    if(name === 'selectedImages'&& value.length > 0)
    {
      this.setState({imageSelectionError:false});
    }
    else{
      this.setState({imageSelectionError:false});
    }
  };

  handleDropdownChange = (name, value) => {
    this.setState({ [name]: value });
  };
  submitProducts = async () => {
    const {
      title,
      titleStatus,
      description,
      descriptionStatus,
      Tags,
      TagsStatus,
      thickness,
      thicknessStatus,
      length,
      lengthStatus,
      width,
      widthStatus,
      productType,
      productTypeStatus,
      brand,
      brandStatus,
      Installationtime,
      InstallationtimeStatus,
      sqFeets,
      fettInput,
      fettInputStatus,
      productColor,
      productColorStatus,
      material,
      materialStatus,
      selectType,
      spaceType,
      spaceTypeStatus,
      usage,
      usageStatus,
      qty,
      qtyStatus,
      price,
      priceStatus,
      tax,
      taxStatus,
      noOfDays,
      noOfDaysStatus,
      shippingCharges,
      selectedImages,
      imageSelectionError,
      
    } = this.state;
  
   
    if (title === "") {
      this.setState({ titleStatus: true });
      return;
    } else {
      this.setState({ titleStatus: false });
    }
  
    if (description === "") {
      this.setState({ descriptionStatus: true });
      return;
    } else {
      this.setState({ descriptionStatus: false });
    }
  if (Tags ==="")
  {
    this.setState({TagsStatus:true});
    return;
  }
  else{
    this.setState({TagsStatus:false});
  }
  if (productType ==="")
  {
    this.setState({productTypeStatus:true});
    return;
  }
  else{
    this.setState({productTypeStatus:false});
  }
  if(brand === "")
  {
    this.setState({brandStatus:true});
    return;
  }
  else
  {
    this.setState({brandStatus:false});
  }
  if(Installationtime === "")
  {
    this.setState({InstallationtimeStatus:true});
    return;
  }
  else{
    this.setState({InstallationtimeStatus:false});
  }
  if(noOfDays === "")
  {
    this.setState({noOfDaysStatus:true});
    return;
  }
  else{
    this.setState({noOfDaysStatus:false});
  }
  if(width === "")
  {
    this.setState({widthStatus:true});
    return;
  }
  else{
    this.setState({widthStatus:false});
  }
  if(length === "")
  {
    this.setState({lengthStatus:true});
    return;
  }
  else{
    this.setState({lengthStatus:false});
  }
  if(thickness === "")
  {
    this.setState({thicknessStatus:true});
    return;
  }
  else{
    this.setState({thicknessStatus:false});
  }
  if(fettInput === "")
  {
    this.setState({fettInputStatus:true});
    return;
  }
  else{
    this.setState({fettInputStatus:false});
  }
  if(material === "")
  {
    this.setState({materialStatus:true});
    return;
  }
  else{
    this.setState({materialStatus:false});
  }
  if(productColor === "")
  {
    this.setState({productColorStatus:true});
    return;
  }
  else{
    this.setState({productColorStatus:false});
  }
  if(spaceType === "")
  {
    this.setState({spaceTypeStatus:true});
    return;
  }
  else{
    this.setState({spaceTypeStatus:false});
  }
  if(usage === "")
  {
    this.setState({usageStatus:true});
    return;
  }
  else{
    this.setState({usageStatus:false})
  }
  if(qty === "")
  {
    this.setState({qtyStatus:true});
    return;
  }
  else{
    this.setState({qtyStatus:false})
  }
  if(price === "")
  {
    this.setState({priceStatus:true});
    return;
  }
  else{
    this.setState({priceStatus:false})
  }
  if(tax === "")
  {
    this.setState({taxStatus:true});
    return;
  }
  else{
    this.setState({taxStatus:false});
  }
  if (!this.state.selectedImages || this.state.selectedImages.length === 0) {
    this.setState({imageSelectionError: true });
    return;
  }
  else{
    this.setState({imageSelectionError:false});
  }
    if (!selectedImages || selectedImages.length === 0) {
      console.error("Selected images are required.");
      return;
    }
  
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("Tags",Tags);
    formData.append("productType", productType);
    formData.append("brand", brand);
    formData.append("Installationtime",Installationtime);
    formData.append("fettInput", fettInput);
    formData.append("sqFeets", sqFeets);
    formData.append("productColor", productColor);
    formData.append("material", material);
    formData.append("selectType", selectType);
    formData.append("spaceType", spaceType);
    formData.append("usage", usage);
    formData.append("thickness", thickness);
    formData.append("length", length);
    formData.append("width", width);
    formData.append("qty", qty);
    formData.append("price", price);
    formData.append("tax", tax);
    formData.append("noOfDays", noOfDays);
    formData.append("shippingCharges", shippingCharges);
    
    for (let i = 0; i < selectedImages.length; i++) {
      if(!titleStatus &&!descriptionStatus &&!TagsStatus && !productTypeStatus && !brandStatus &&!InstallationtimeStatus && !noOfDaysStatus && !widthStatus && !lengthStatus && !thicknessStatus && !fettInputStatus && !materialStatus && !productColorStatus  && !spaceTypeStatus && !usageStatus && !qtyStatus && !priceStatus && !taxStatus &&!imageSelectionError){
      try {
        let uri;
  
        if (selectedImages[i].uri) {
          uri = selectedImages[i].uri;
        } else if (
          selectedImages[i].assets &&
          selectedImages[i].assets.length > 0 &&
          selectedImages[i].assets[0].uri
        ) {
          uri = selectedImages[i].assets[0].uri;
        } else {
          console.error(
            `Image at index ${i} does not have a valid URI. Image object:`,
            selectedImages[i]
          );
          continue;
        }
  
        const response = await fetch(uri);
        const blob = await response.blob();
  
        formData.append(
          "productImages",
          new File([blob], `productImage_${i}.png`, {
            type: "image/png",
          })
        );
      } catch (error) {
        console.error(`Error processing image at index ${i}:`, error);
      }
    }
    }
  

  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${jwtToken}`,
      },
    };
  
    
    axios.post("http://localhost:9000/vendorProducts", formData, config)
      .then((response) => {
        console.log(response.data);
      
        this.setState({
          title: "",
          description: "",
          productType: "",
          Tags:"",
          brand: "",
          Installationtime:"",
          fettInput: "",
          sqFeets: "",
          productColor: "",
          material: "",
          selectType: "",
          spaceType: "",
          spaceTypeStatus:"",
          usage: "",
          usageStatus:"",
          qty: "",
          qtyStatus:"",
          price: "",
          tax: "",
          taxStatus:"",
          thickness: "",
          thicknessStatus:"",
          priceStatus:"",
          length: "",
          width: "",
          noOfDays: "",
          shippingCharges: "",
          selectedImages: [],
          imageSelectionError:"",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      this.setState({
        image: result.assets[0].uri,
        imageName: result.assets[0].fileName || 'Unknown'
      });
    }
  };
  uploadImages = async () => {
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
  
      if (!result.cancelled) {
        console.log("Image result:", result);
  
        const selectedImages = result.assets.map((image) => ({
          uri: image.uri,
          fileName: image.fileName,
          base64: image.base64,
        }));
  
        if (selectedImages.length > 0) {
          const firstImageName = selectedImages[0].fileName || (selectedImages[0].uri ? selectedImages[0].uri.split('/').pop() : 'Invalid Image');
          this.setState({ thumbnail: firstImageName });
  
          
          const filename = firstImageName || 'Invalid Image';
          this.setState({ selectedImageFilename: filename });
        }
  
        this.setState((prevState) => ({
          selectedImages: [...prevState.selectedImages, ...selectedImages],
        }));
      }
    } catch (error) {
      console.error('Error picking images: ', error);
    }
  };
  
  
  
  renderSelectedImageNames = () => {
    const { selectedImages } = this.state;
  
    return selectedImages.map((image, index) => (
      <View key={index}>
        <Text style={styles.imageName}>
          {image.fileName ? image.fileName : (image.uri ? image.uri.split('/').pop() : 'Invalid Image')}
        </Text>
      </View>
    ));
  };
  

  render() {
    const {
      title,
      description,
      descriptionStatus,
      titleStatus,
      Tags,
      TagsStatus,
      productType,
      productTypeStatus,
      Installationtime,
      InstallationtimeStatus,
      width,
      widthStatus,
      length,
      lengthStatus,
      thickness,
      thicknessStatus,
      brand,
      brandStatus,
      sqFeets,
      fettInput,
      fettInputStatus,
      productColor,
      productColorStatus,
      material,
      materialStatus,
      selectType,
      spaceType,
      spaceTypeStatus,
      usage,
      usageStatus,
      qty,
      qtyStatus,
      price,
      priceStatus,
      tax,
      taxStatus,
      noOfDays,
      noOfDaysStatus,
      shippingCharges,
      materialsArray,
      productImages,
      imageSelectionError,
      
    } = this.state;
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity >
          <AntDesign
            name="arrowleft"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.Title}>Add new Products</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '90%' }}>
  <MaterialIcons name="notifications-none" size={35} style={{alignContent: 'flex-end'}} />
</View>
        </View>
        <View style={styles.horizontalline} />
        <ScrollView>
        <View style={{flexDirection:'column',marginTop:wp('2.5%') }}>
        <Text style={{fontSize:'15', fontWeight:'500' ,marginLeft:wp('2.5%')}}>Product Title</Text>
        <View style={styles.Frame}>
        <TextInput placeholder='QUANTRA'   style={styles.TextInputone} placeholderTextColor='#747474'
         value={title}
         onChangeText={(text) => this.onChangeValues("title", text)}/>
      </View>
      {titleStatus && (
              <Text style={{...styles.errorMsg, color:'red', marginLeft:wp('2.5%')}}>*Title is Required</Text>
            )}
      </View>
      <View style={{flexDirection:'column',marginTop:wp('1.5%') }}>
        <Text style={{fontSize:'15', fontWeight:'500' ,marginLeft:wp('2.5%')}}>Product Description</Text>
        <View style={styles.Frameone}>
        <TextInput style={styles.TextInputtwo} placeholder='Comunicate with Visitors at Your doorbell from your smartphone. Whether your in your House or mile away .Enchance your control over who enters your premises.' placeholderTextColor={'#747474'}  
        value={description}
        onChangeText={(text) => this.onChangeValues("description", text)}></TextInput>
        </View>
        {descriptionStatus && (
              <Text style={{...styles.errorMsg, color:'red', marginLeft:wp('2.5%')}}>*Description is Required</Text>
            )}
      </View>
      <View style={{flexDirection:'column',marginTop:wp('1.5%') }}>
        <Text style={{fontSize:'15', fontWeight:'500' ,marginLeft:wp('2.5%')}}>Tags</Text>
        <View style={styles.Frametwo}>
        <TextInput style={styles.TextInputthree} placeholder='Smart Doorbell, Two-Way Audio, Home Security, Video Doorbell, Smart Home Technology, Remote Communication, Security Surveillance.' placeholderTextColor={'#747474'}
       value={Tags}
        onChangeText={(text) => this.onChangeValues("Tags", text)}></TextInput>
        </View>
        {TagsStatus && (<Text style={{color:'red',marginLeft:wp('2.5%')}}>*Tags are Required</Text>)}
      </View>
      <View style={{ flexDirection: "row", padding: wp('2%'), marginRight:wp('2.5%') }}>
          <View>
          <Picker
   selectedValue={productType}
    onValueChange={(itemValue) =>this.onChangeValues("productType",itemValue)}
    style={{...styles.dropdownStyle, height:wp('2%'), marginLeft:wp('0.5%')}}
  >
    <Picker.Item label="Product Type" value="" />
  <Picker.Item label="Electronics " value="Electronics" />
  <Picker.Item label="Wood" value="Wood" />
  <Picker.Item label="Electrical" value="Electrical" />
  <Picker.Item label="Titles" value="Titles" />
  <Picker.Item label="Wallpapers" value="Wallpapers" />
  <Picker.Item label="Paint" value="Paint" />
  <Picker.Item label="Sanitary" value="Sanitary" />
  </Picker>
          </View>
          <View>
          <Picker
    selectedValue={brand}
    onValueChange={(value) => this.onChangeValues("brand",value)}
    style={{...styles.dropdownStyle, height:wp('2%'), marginLeft:wp('4.5%')}}
  >
    <Picker.Item label="Brand" value="" />
  <Picker.Item label="Brand 1 " value="Brand 1" />
  <Picker.Item label="Brand 2" value="Brand 2" />
  <Picker.Item label="Brand 3" value="Brand 3" />
  <Picker.Item label="Brand 4" value="Brand 4" />
  <Picker.Item label="Brand 5" value="Brand 5" />
  
  </Picker>
          </View>
        </View>
        {productTypeStatus &&(<Text style={{color:'red',marginLeft:wp('2.5%') ,marginTop:-wp('1.5%')}}>* Select the Product Type</Text>)}
        {brandStatus &&(<Text style={{color:'red',marginLeft:wp('52%') ,marginTop:-wp('1.5%')}}>* Select brand</Text>)}
        <View style={{flexDirection:"row", marginTop:wp('1%')}}>
        <View>
        <Picker
    selectedValue={Installationtime}
    onValueChange={(itemValue) =>this.onChangeValues("Installationtime",itemValue)}
    style={{...styles.dropdownStyle, height:wp('2%'), marginLeft:wp('2.5%')}}
  >
    <Picker.Item label="Installationtime" value="" />
  <Picker.Item label="5 days " value="5 days" />
  <Picker.Item label="10 days" value="10 days" />
  <Picker.Item label="15 days" value="15 days" />
</Picker>
          </View>
          <View style={styles.Framethree}>
    <TextInput placeholder='10' style={styles.TextInputfour} placeholderTextColor='#3F3F3F'
    value={noOfDays}
     onChangeText={(text) =>this.onChangeValues("noOfDays",text)}/>
    <View
      
      style={{ 
        backgroundColor: '#e0e0e0', 
        borderColor:'transperent',
        width: wp('6.2%'),
        height: wp('2.5%'), 
        marginTop: -wp('0.1%'), 
        marginLeft:wp('30%'),
      }}
    >
      <Text style={{textAlign:'center' ,marginTop:wp('0.6%')}}>Days</Text>
      </View>
  </View>
        </View>
        {InstallationtimeStatus &&(<Text style={{color:'red',marginLeft:wp('2.5%') ,marginTop:-wp('0.5%')}}>*Select Time</Text>)}
        {noOfDaysStatus &&(<Text style={{color:'red',marginLeft:wp('50%') ,marginTop:wp('0.5%')}}>* Enter Number of Days</Text>)}
        
        <View style={{flexDirection:'row', }}>
      <View style={{flexDirection:'column', marginTop: wp('1.5%')}}>
  <Text style={{fontSize: '15', fontWeight: '500', marginLeft: wp('2.5%')}}>Width</Text>
  <View style={styles.Framefive}>
    <TextInput placeholder='1400' style={styles.TextInputfour} placeholderTextColor='#3F3F3F'
    value={width}
    onChangeText={(text) =>this.onChangeValues("width",text)}/>
    <Picker
      onValueChange={(itemValue) => setselectedWidth(itemValue)}
      style={{ 
        backgroundColor: '#e0e0e0', 
        borderColor: 'transparent',
        width: wp('6.2%'),
        height: wp('2.5%'),
        marginTop: -wp('0.1%'), 
        marginLeft:wp('35%'),
      }}
    >
      <Picker.Item label="MM" value="MM" />
      <Picker.Item label="Sq Cms" value="Sq Cms" />
      <Picker.Item label=" Sq Inches" value="Sq Inches" />
      <Picker.Item label="Sq Meters" value="Sq Meters" />
      <Picker.Item label="Sq MMS" value="Sq MMS" />
    </Picker>
  </View>
</View>
 <View style={{flexDirection:'column',marginTop:wp('1.5%') }}>
        <Text style={{fontSize:'15', fontWeight:'500' ,marginLeft:wp('2.5%')}}>Length</Text>
        <View style={styles.Frameseven}>
        <TextInput placeholder='1400' style={styles.TextInputfive} placeholderTextColor='#3F3F3F'
       value={length}
        onChangeText={(text) =>this.onChangeValues("length",text)}/>
      <Picker
      onValueChange={(itemValue) => setselectedLength(itemValue)}
      style={{ 
        backgroundColor: '#e0e0e0', 
        borderColor: 'transparent',
        width: wp('5.8%'),
        height: wp('2.5%'),
        marginTop: -wp('0.5%'),  
        marginLeft:wp('24.6%'),
      }}
    >
      <Picker.Item label="MM" value="MM" />
      <Picker.Item label="Sq Cms" value="Sq Cms" />
      <Picker.Item label=" Sq Inches" value="Sq Inches" />
      <Picker.Item label="Sq Meters" value="Sq Meters" />
      <Picker.Item label="Sq MMS" value="Sq MMS" />
    </Picker>
      </View>
      </View>
      </View>
      {widthStatus &&(<Text style={{color:'red',marginLeft:wp('2.5%') ,marginTop:wp('0.5%')}}>*Enter width</Text>)}
      {lengthStatus &&(<Text style={{color:'red',marginLeft:wp('58%') ,marginTop:wp('0.5%')}}>*Enter Length</Text>)}
      <View style={{flexDirection:'row', }}>
      <View style={{flexDirection:'column', marginTop: wp('1.5%')}}>
  <Text style={{fontSize: '15', fontWeight: '500', marginLeft: wp('2.5%')}}>Thickness</Text>
  <View style={styles.Framenine}>
    <TextInput placeholder='4mm' style={styles.TextInputsix} placeholderTextColor='#3F3F3F'
    value={thickness}
    onChangeText={(text) =>this.onChangeValues("thickness",text)}/>
     <Picker
      onValueChange={(itemValue) => setselectedThickness(itemValue)}
      style={{ 
        backgroundColor: '#e0e0e0', 
        borderColor: 'transparent',
        width: wp('6.2%'),
        height: wp('2.5%'),
        marginTop: -wp('0.1%'), 
        marginLeft:wp('35%'),
      }}
    >
      <Picker.Item label="MM" value="MM" />
      <Picker.Item label="Sq Cms" value="Sq Cms" />
      <Picker.Item label=" Sq Inches" value="Sq Inches" />
      <Picker.Item label="Sq Meters" value="Sq Meters" />
      <Picker.Item label="Sq MMS" value="Sq MMS" />
    </Picker>
  </View>
</View>
 <View style={{flexDirection:'column',marginTop:wp('1.5%') }}>
        <Text style={{fontSize:'15', fontWeight:'500' ,marginLeft:wp('2.5%')}}>Size</Text>
        <View style={styles.Frameeleven}>
        <TextInput placeholder='4mm' style={styles.TextInputseven} placeholderTextColor='#3F3F3F'
    value={fettInput}
    onChangeText={(text) =>this.onChangeValues("fettInput",text)}/>
     <Picker
      onValueChange={(itemValue) => setselectedsize(itemValue)}
      style={{ 
        backgroundColor: '#e0e0e0', 
        borderColor: 'transparent',
        width: wp('5.8%'),
        height: wp('2.5%'),
        marginTop: -wp('0.5%'), 
        marginLeft:wp('25%'),
      }}
    >
      <Picker.Item label="MM" value="MM" />
      <Picker.Item label="Sq Cms" value="Sq Cms" />
      <Picker.Item label=" Sq Inches" value="Sq Inches" />
      <Picker.Item label="Sq Meters" value="Sq Meters" />
      <Picker.Item label="Sq MMS" value="Sq MMS" />
    </Picker>
      </View>
      </View>
      </View>
      {thicknessStatus &&(<Text style={{color:'red',marginLeft:wp('2.5%') ,marginTop:wp('0.5%')}}>*Enter thickness</Text>)}
      {fettInputStatus &&(<Text style={{color:'red',marginLeft:wp('58%') ,marginTop:wp('0.5%')}}>*Enter size</Text>)}
      <View style={{ flexDirection: "row", padding: wp('2%'), marginRight:wp('2.5%') }}>
          <View>
          <Picker
    selectedValue={material}
    onValueChange={(itemValue) =>this.onChangeValues("material",itemValue)}
    style={{...styles.dropdownStyle, height:wp('2%'), marginLeft:wp('1.5%')}}
  >
    <Picker.Item label="Material" value="" />
  <Picker.Item label="Wood " value="Wood" />
  <Picker.Item label="Steel" value="Steel" />
  <Picker.Item label="Glass" value="Glass" />
  </Picker>
          </View>
          <View>
          <Picker
    selectedValue={productColor}
    onValueChange={(itemValue) =>this.onChangeValues("productColor",itemValue)}
    style={{...styles.dropdownStyle, height:wp('2%'),marginLeft:wp('1.5%')}}
  >
     <Picker.Item label="Color" value="" />
  <Picker.Item label="Red " value="Red" />
  <Picker.Item label="Blue" value="Blue" />
  <Picker.Item label="Green" value="Green" />
  <Picker.Item label="Yellow" value="Yellow" /> 
  </Picker>
          </View>
        </View>
        {materialStatus &&(<Text style={{color:'red',marginLeft:wp('3.2%') ,marginTop:-wp('1.5%')}}>*Select Material</Text>)}
        {productColorStatus &&(<Text style={{color:'red',marginLeft:wp('50%') ,marginTop:-wp('1.8%')}}>*Select Color</Text>)}
        <View style={{ flexDirection: "row",  marginRight:wp('2.5%') }}>
          <View>
          <Picker
   selectedValue={spaceType}
   onValueChange={(itemValue) =>this.onChangeValues("spaceType",itemValue)}
   style={{...styles.dropdownStyle, height:wp('2%'),marginLeft:wp('2%')}}
  >
    <Picker.Item label="Space Type" value="" />
    <Picker.Item label="Residential" value="Residential" />
    <Picker.Item label="Commercial" value="Commercial" />
    
  </Picker>
          </View>
          <View>
          <Picker
    selectedValue={usage}
    onValueChange={(itemValue) =>this.onChangeValues("usage",itemValue)}
    style={{...styles.dropdownStyle, height:wp('2%'),marginLeft:wp('2%')}}
  >
   <Picker.Item label="Usage" value="" />
    <Picker.Item label="Indoor" value="Indoor" />
    <Picker.Item label="Outdoor" value="Outdoor" />
  </Picker>
          </View>
        </View>
        {spaceTypeStatus &&(<Text style={{color:'red',marginLeft:wp('1.6%') ,marginTop:wp('1%')}}>*Select Space Type</Text>)}
        {usageStatus &&(<Text style={{color:'red',marginLeft:wp('49%') ,marginTop:wp('1%')}}>*Select Usage</Text>)}
        <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column', marginTop: wp('1.5%') }}>
      
        <View style={styles.Framethirteen}>
          <Picker
          selectedValue={qty}
          onValueChange={(itemValue) =>this.onChangeValues("qty",itemValue)}
          style={styles.PickerStyle}
          >
            <Picker.Item label="QTY" value="" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
          </Picker>
        </View>
      </View>

      <View style={{ flexDirection: 'column', marginTop: wp('1.5%') }}>
       
        <View style={styles.Framefourteen}>
          <TextInput
            placeholder="Product Price"
            style={styles.TextInputeight}
            placeholderTextColor="#3F3F3F"
            value={price}
        onChangeText={(text) =>this.onChangeValues("price",text)}
          
          />
        </View>
      </View>

      <View style={{ flexDirection: 'column', marginTop: wp('1.5%') }}>

        <View style={styles.Framefifteen}>
          <TextInput
            placeholder="Tax%"
            style={styles.TextInputnine}
            placeholderTextColor="#3F3F3F"
            value={tax}
            onChangeText={(text) =>this.onChangeValues("tax",text)}
          />
        </View>
      </View>
    </View>
    {qtyStatus &&(<Text style={{color:'red',marginLeft:wp('3.2%') ,marginTop:wp('0.5%')}}>*Select quantity</Text>)}
    {priceStatus &&(<Text style={{color:'red',marginLeft:wp('16%') ,marginTop:wp('1%')}}>*Enter price</Text>)}
    {taxStatus &&(<Text style={{color:'red',marginLeft:wp('61%') ,marginTop:wp('1%')}}>*Enter tax</Text>)}
        </ScrollView>
      <View>
      <ScrollView>                                                                                 
      <TouchableOpacity style={styles.button1}  onPress={this.submitProducts} >
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop:wp('0.5%') }}>
    <Text style={styles.buttonText}>Submit</Text>
    
 </View>
</TouchableOpacity>
<View style={styles.horizontallineone} />
<View style={{justifyContent:"center"}}>
<View style={{flexDirection:'column', justifyContent:"center", marginTop: wp('1.5%') , marginLeft:wp('25%')}}>
  <Text style={{fontSize: '15', fontWeight: '500', marginLeft: wp('2.5%')}}>Product Images</Text>
  <View style={styles.Frametwenty}>
  <TextInput 
  placeholder='image 1, image 2' 
  style={styles.TextInputnine} 
  placeholderTextColor='#C7C7C7'
  value={this.state.selectedImageFilename} 
 
/>

  <View style={{marginBottom:wp('0.5%')}}>
  <TouchableOpacity  onPress={this.uploadImages}>
    <View style={{...styles.Frameseventeen,marginTop:-wp('1.5%')}}>
      <Text style={{fontWeight: '500', marginTop:wp('0.1%'), textAlign: 'center'}}>Attach</Text>
      <EvilIcons
            name="paperclip"
            size={wp('3%')}
            color="#000"
            style={styles.iconone}
          />
    </View>
    </TouchableOpacity>
    </View>
  </View>
</View>
{this.state.imageSelectionError && (
        <Text style={{ color: 'red', marginTop: 5 }}>Please select at least one image.</Text>
      )}
 {/* <View style={{flexDirection:'column', justifyContent:"center", marginTop: wp('1.5%') , marginLeft:wp('25%')}}>
  <Text style={{fontSize: '15', fontWeight: '500', marginLeft: wp('2.5%')}}>File Upload</Text>
  <View style={styles.Frameeighteen}>
    <TextInput placeholder='Upload' style={styles.TextInputnine}  value={this.state.selectedImageFilename}  placeholderTextColor='#C7C7C7'/>
  <View style={{marginBottom:wp('0.5%')}}>
  <TouchableOpacity  onPress={this.uploadImages}>
    <View style={{...styles.Framenineteen,marginTop:-wp('1.5%')}}>
      <Text style={{fontWeight: '500', marginTop:wp('0.1%'), textAlign: 'center'}}>Attach</Text>
      <MaterialIcons
            name="upload"
            size={wp('3%')}
            color="#000"
            style={styles.icontwo}
          />
    </View>
    </TouchableOpacity>
    </View>
  </View>
    </View> */}
</View>
 </ScrollView>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalline: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    width: '100%',
    marginTop: 20, 
  },
  horizontallineone: {
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    width: '100%',
    marginTop: wp('2.0%'), 
    
  },

  header: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  Title: {
    fontSize: 12,
    marginLeft: '1.5%',
    flex: 1, 
    Color:"#000000",
    fontWeight:"500",
  },
  icon: {
    fontSize: 24,
    alignSelf: 'flex-start',
    marginTop: '0.5%',
  },
  requestButton: {
    backgroundColor: '#c69679',
    borderRadius: 8,
    padding: 12,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
   },
   Frame: {
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor:'transparent',
    padding: 10,
    marginLeft:wp('2.5%'),
    marginRight:wp('2.5%'),
    marginTop:wp('0.5%'),
  },
  Frameone: {
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor:'transparent',
    padding: 10,
    marginLeft:wp('2.5%'),
    marginRight:wp('2.5%'),
    marginTop:wp('0.5%'),
    height: hp('7.5%'),
},
Frametwo: {
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor:'transparent',
    padding: 10,
    marginLeft:wp('2.5%'),
    marginRight:wp('2.5%'),
    marginTop:wp('0.5%'),
    height: hp('7.5%'),
},
TextInputone:{
    fontWeight:"500",
},
TextInputtwo:{
        fontWeight:"500",
 },
 TextInputthree:{
    fontWeight:"500",
},
   placeholderStyle: {
    fontWeight: '600',
    marginLeft:wp('1.0%'),
  },
  dropdownContainer: {
    height: hp('5%'),
    marginHorizontal: wp('2%'),
  },
  dropdownStyle: {
    backgroundColor: '#F5F5F5',
    width: wp('45%'),
    borderColor: 'white',
  },
  
  dropdownItemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
  },
  placeholderStyle: {
    fontWeight: '600',
    marginLeft:wp('1.0%'),
  },
  dropdownContainerone: {
    height: hp('5%'),
    marginHorizontal: wp('2%'),
  },
  dropdownStyleone: {
    backgroundColor: '#F5F5F5',
    width: wp('45%'),
    borderColor: 'white',
  },
  
  dropdownItemStyleone: {
    justifyContent: 'flex-start',
  },
  dropDownStyleone: {
    backgroundColor: '#fafafa',
  },
  placeholderStyleone: {
    fontWeight: '600',
    marginLeft:wp('1.0%'),
  },
  dropdownContainertwo: {
    height: hp('5%'),
    marginHorizontal: wp('2%'),
    marginLeft:wp('2.5%'),
  },
  dropdownStyletwo: {
    backgroundColor: '#F5F5F5',
    width: wp('45%'),
    borderColor: 'white',
  },
  
  dropdownItemStyletwo: {
    justifyContent: 'flex-start',
  },
  dropDownStyletwo: {
    backgroundColor: '#fafafa',
  },
  placeholderStyletwo: {
    fontWeight: '600',
    marginLeft:wp('1.0%'),
    fontSize:wp('0.6%')
  },
  Framethree: {
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: '#F5F5F5',
    borderColor: 'transparent',
    padding: 0,
    width: wp('46.2%'),
    marginLeft: wp('2.7%'),
    marginRight: wp('2.5%'),
    marginTop: wp('0.2%'),
    height: hp('5.0%'),
  },
  TextInputfour: {
    fontWeight: '600',
    marginLeft: wp('1.0%'),
  },
  Framefour: {
    borderWidth: 1,
    backgroundColor: '#ECECEC',
    borderColor: 'transparent',
    padding: 10,
    width: wp('7.0%'),
    height: hp('3.6%'),
    marginLeft: wp('27.1%'),
  },
  dropdownContainerthree: {
    height: hp('5%'),
    marginHorizontal: wp('2%'),
  },
  dropDownStylethree: {
    backgroundColor: '#F5F5F5',
    width: wp('45%'),
    borderColor: 'white',
  },
  
  dropdownItemStylethree: {
    justifyContent: 'flex-start',
  },
  dropDownStylethree: {
    backgroundColor: '#fafafa',
  },
  placeholderStylethree: {
    fontWeight: '600',
    marginLeft:wp('1.0%'),
    fontSize:wp('0.6%')
  },
  Frameseven: {
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor:'transparent',
    padding: 10,
    flexDirection: "row",
    width:wp('40%'),
    marginLeft:wp('2.5%'),
    marginRight:wp('5.5%'),
    marginTop:wp('0.5%'),
    height: hp('5.0%'),
  },
  Framefive: {
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: '#F5F5F5',
    borderColor: 'transparent',
    padding: 0,
    width: wp('50%'),
    marginLeft: wp('2.5%'),
    marginRight: wp('2.5%'),
    marginTop: wp('0.5%'),
    height: hp('5.0%'),
  },
  Framesix: {
    borderWidth: 1,
    backgroundColor: '#E0E0E0',
    borderColor: 'transparent',
    padding: 10,
    width: wp('7.0%'),
    height: hp('4.0%'),
    marginLeft: wp('31%'),
  },
  
  Frameeight: {
    borderWidth: 1,
    backgroundColor: '#E0E0E0',
    borderColor: 'transparent',
    padding: 10,
    width: wp('7.0%'),
    height: hp('4.0%'),
    marginLeft: wp('31%'),
    marginBottom:wp('5.5%'),
    marginTop:-wp('1.5%'),
  },
  
  TextInputfive: {
    fontWeight: '600',
    marginLeft: wp('1.0%'),
  }, 
  TextInputsix:
  {
      fontWeight:"500",
        
  }, 
  
  dropdownContainerfour: {
      height: hp('5%'),
      marginHorizontal: wp('2%'),
    },
    dropDownStylefour: {
      backgroundColor: '#F5F5F5',
      width: wp('45%'),
      borderColor: 'white',
    },
    
    dropdownItemStylefour: {
      justifyContent: 'flex-start',
    },
    dropDownStylefour: {
      backgroundColor: '#fafafa',
    },
    placeholderStylefour: {
      fontWeight: '600',
      marginLeft:wp('1.0%'),
      fontSize:wp('0.6%')
    },
  
  dropdownContainerfive: {
      height: hp('5%'),
      marginHorizontal: wp('2%'),
    },
    dropDownStylefive: {
      backgroundColor: '#F5F5F5',
      width: wp('45%'),
      borderColor: 'white',
    },
    
    dropdownItemStylefive: {
      justifyContent: 'flex-start',
    },
    dropDownStylefive: {
      backgroundColor: '#fafafa',
    },
    placeholderStylefive: {
      fontWeight: '600',
      marginLeft:wp('1.0%'),
      fontSize:wp('0.6%')
    },
    Framenine: {
        borderWidth: 1,
        flexDirection: "row",
        backgroundColor: '#F5F5F5',
        borderColor: 'transparent',
        padding: 0,
        width: wp('50%'),
        marginLeft: wp('2.5%'),
        marginRight: wp('2.5%'),
        marginTop: wp('0.5%'),
        height: hp('5.0%'),
      },
      Frameten: {
        borderWidth: 1,
        backgroundColor: '#E0E0E0',
        borderColor: 'transparent',
        padding: 10,
        width: wp('7.0%'),
        height: hp('4.0%'),
        marginLeft: wp('31%'),
      },
    TextInputsix: {
        fontWeight: '600',
        marginLeft: wp('1.0%'),
      },
    
    dropdownContainersix: {
          height: hp('5%'),
          marginHorizontal: wp('2%'),
        },
        dropDownStylesix: {
          backgroundColor: '#F5F5F5',
          width: wp('45%'),
          borderColor: 'white',
        },
        
        dropdownItemStylesix: {
          justifyContent: 'flex-start',
        },
        dropDownStylesix: {
          backgroundColor: '#fafafa',
        },
        placeholderStylesix: {
          fontWeight: '600',
          marginLeft:wp('1.0%'),
          fontSize:wp('0.6%')
        },
     Frameeleven: {
        borderWidth: 1,
        backgroundColor: '#F5F5F5',
        flexDirection:'row',
        borderColor:'transparent',
        padding: 10,
        width:wp('40%'),
        marginLeft:wp('2.5%'),
        marginRight:wp('5.5%'),
        marginTop:wp('0.5%'),
        height: hp('5.0%'),
      },
    TextInputseven: {
        fontWeight: '600',
        marginLeft: wp('1.0%'),
      },
    Frametweleve: {
        borderWidth: 1,
        backgroundColor: '#E0E0E0',
        borderColor: 'transparent',
        padding: 10,
        width: wp('7.0%'),
        height: hp('4.0%'),
        marginLeft: wp('31%'),
        marginBottom:wp('5.5%'),
        marginTop:-wp('1.5%'),
      },
    dropdownContainerseven: {
          height: hp('5%'),
          marginHorizontal: wp('2%'),
        },
        dropDownStyleseven: {
          backgroundColor: '#F5F5F5',
          width: wp('45%'),
          borderColor: 'white',
        },
        
        dropdownItemStyleseven: {
          justifyContent: 'flex-start',
        },
        dropDownStyleseven: {
          backgroundColor: '#fafafa',
        },
        placeholderStyleseven: {
          fontWeight: '600',
          marginLeft:wp('1.0%'),
          fontSize:wp('0.6%')
        },
        Framethirteen: {
            borderWidth: 1,
            backgroundColor: '#D9D9D9',
            borderColor: 'transparent',
            padding: 10,
            width: wp('5%'),
            marginLeft: wp('2.5%'),
            marginRight: wp('5.5%'),
            marginTop: wp('0.5%'),
            height: hp('5.0%'),
            flexDirection: 'row',
            alignItems: 'center',
          },
        
          PickerStyle: {
            height: hp('5.0%'),
            width: '100%',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
        
          Framefourteen: {
            borderWidth: 1,
            backgroundColor: '#F5F5F5',
            borderColor: 'transparent',
            padding: 10,
            width: wp('40%'),
            marginLeft: wp('2.5%'),
            marginRight: wp('2.5%'),
            marginTop: wp('0.5%'),
            height: hp('5.0%'),
          },
        
          Framefifteen: {
            borderWidth: 1,
            backgroundColor: '#F5F5F5',
            borderColor: 'transparent',
            padding: 10,
            width: wp('25%'),
            marginLeft: wp('2.5%'),
            marginRight: wp('5.5%'),
            marginTop: wp('0.5%'),
            height: hp('5.0%'),
          },
        
          TextInputeight: {
            fontWeight: '500',
          },
        
          TextInputnine: {
            fontWeight: '300',
            color:'#C7C7C7',
          },
          button1: {
            backgroundColor: '#c69679',
            borderRadius: wp('0.2%'),
            width: wp('20.5%'),
            alignSelf: "center",
            height: wp('2.5%'),
            marginLeft: wp('4%'),
            marginTop:wp('2.0%'),
          },
          
          buttonText: {
            alignSelf: "center",
            color: '#fff',
            fontWeight: 'bold',
            fontSize:20,
            marginBottom:wp('5.0%'),
          },
          Framesixteen:{
            borderWidth: 1,
            backgroundColor: '#F5F5F5',
            borderColor:'transparent',
            
            width:wp('40%'),
            marginLeft:wp('2.5%'),
            marginRight:wp('5.5%'),
            marginTop:wp('0.5%'),
            height: hp('5.0%'),
          },
          Frameseventeen: {
            borderWidth: 1,
            backgroundColor: '#D9D9D9',
            borderColor: 'transparent',
            padding: 10,
            width: wp('5.0%'),
            height: hp('5.0%'),
            marginLeft: wp('35%'),
            marginBottom:hp('12.5%'),
            flexDirection:'row',
            
            
          },
          TextInputeight:{
            fontWeight:"500",
            marginLeft:wp('1.5%'),
            marginTop:wp('0.5%'),
          },
           iconone: {
              fontSize: wp('2%'),
              alignContent:'center',
              marginTop: -wp('0.3%'),
            },
            Frameeighteen:{
                borderWidth: 1,
                backgroundColor: '#F5F5F5',
                borderColor:'transparent',
                
                width:wp('40%'),
                marginLeft:wp('2.5%'),
                marginRight:wp('5.5%'),
                marginTop:wp('0.5%'),
                height: hp('5.0%'),
              },
              Framenineteen: {
                borderWidth: 1,
                backgroundColor: '#D9D9D9',
                borderColor: 'transparent',
                padding: 10,
                width: wp('5.0%'),
                height: hp('5.0%'),
                marginLeft: wp('35%'),
                marginBottom:hp('12.5%'),
                flexDirection:'row',
                
                
              },
              TextInputnine:{
                fontWeight:"500",
                marginLeft:wp('1.5%'),
                marginTop:wp('0.5%'),
              },
               icontwo: {
                  fontSize: wp('2%'),
                  alignContent:'center',
                  marginTop:-wp('0.1%'),
                },
                Frametwenty:{
                  borderWidth: 1,
                  backgroundColor: '#F5F5F5',
                  borderColor:'transparent',
                  
                  width:wp('40%'),
                  marginLeft:wp('2.5%'),
                  marginRight:wp('5.5%'),
                  marginTop:wp('0.5%'),
                  height: hp('5.0%'),
                },
});

export default AddnewProducts;
