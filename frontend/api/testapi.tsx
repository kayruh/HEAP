import React from 'react';
import { useBusinessApi } from './business';
import { View, Text, Button } from 'react-native';

export function MyBusinessScreen() {
  const { getBusinessInfo, updateBusinessDisplay } = useBusinessApi();
  const [info, setInfo] = React.useState<any>(null);

  React.useEffect(() => {
    getBusinessInfo('myBizUsername').then(setInfo);
  }, []);

  async function onAddPhoto() {
    // imagine you just uploaded a new picture… now save it
    await updateBusinessDisplay('carousel', ['https://…new-url.jpg']);
    alert('Saved!');
  }

  if (!info) return console.log("issue");
  return (
    <View>
      <Text>{info.name}</Text>
    //   <Button onPress={onAddPhoto} title="Add Photo" />
    <Button  title="Add Photo" />

    </View>
  );
}
