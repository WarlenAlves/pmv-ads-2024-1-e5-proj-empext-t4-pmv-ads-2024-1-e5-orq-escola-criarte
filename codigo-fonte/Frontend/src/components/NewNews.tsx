import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../config/authUtils';
import styles from '../styles/ModalCreate';
import { getToken } from '../config/authUtils';
import { jwtDecode } from 'jwt-decode';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

interface Props {
    visible: boolean;
    onClose: () => void;
    onUpdate: () => void;
    modalStyle?: object;
}

interface UserData {
    'user_name': string;
}

interface News {
    title: string;
    description: string;
    imageURL: string;
}

export default function CreateNewsModal({ visible, onClose, modalStyle, onUpdate }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<{ uri: string }>({ uri: '' });
    const [username, setUsername] = useState<string>('');
    const isFormComplete = title && description && image.uri;

    React.useEffect(() => {
        async function fetchUserData() {
            try {
                const token = await getToken();
                if (token) {
                    const decoded = jwtDecode<UserData>(token);
                    setUsername(decoded['user_name']);
                } else {
                    console.log('Token é nulo');
                }
            } catch (error) {
                console.error("Erro ao obter os dados do usuário:", error);
            }
        };

        fetchUserData();
    }, []);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri } = result.assets[0];

            const resizedImage = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 800, height: 800 } }],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            );

            const base64Image = await FileSystem.readAsStringAsync(resizedImage.uri, { encoding: FileSystem.EncodingType.Base64 });

            setImage({ uri: `data:image/jpeg;base64,${base64Image}` });
        }
    };

    const handleSubmit = async () => {
        const news: News = {
            title,
            description,
            imageURL: image.uri,
        };

        console.log('Enviando o seguinte objeto para a API:', news);

        try {
            const response = await api.post('/news', news);
            if (response.status === 200) {

                console.log('Notícia criada com sucesso');

                setTitle('');
                setDescription('');
                setImage({ uri: '' });
                onUpdate();

            } else {

                throw new Error('Falha na criação da notícia');
            }
            onClose();
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setImage({ uri: '' });
        onClose();
        onUpdate()
    };

    return (
        <Modal animationType="slide" visible={visible} onRequestClose={onClose} transparent={true} style={modalStyle}>
            <ScrollView style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {image.uri ? <Image source={image} style={styles.imagePreview} /> : null}

                        <Text style={styles.title}>Criar News</Text>
                        <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
                        <TextInput style={styles.descriptionInput} placeholder="Descrição" value={description} onChangeText={setDescription} multiline />
                        <Pressable style={styles.button} onPress={selectImage}>
                            <Text style={styles.buttonText}>Selecionar Imagem</Text>
                        </Pressable>
                        <Pressable style={isFormComplete ? styles.button : styles.buttonDisabled} onPress={handleSubmit} disabled={!isFormComplete}>
                            <Text style={styles.buttonText}>Criar</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}
