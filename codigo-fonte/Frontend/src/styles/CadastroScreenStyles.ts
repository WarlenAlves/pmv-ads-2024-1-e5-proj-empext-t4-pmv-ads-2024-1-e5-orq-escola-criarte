import { Platform, StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    marginTop: 50,
    height: '100%',
  },

  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },

  formulario: {
    marginTop: 30,
    flexDirection: 'column',
    width: '93%',
    maxWidth: 400,
  },

  eyeIcon: {
    marginLeft: -35,
    marginBottom: 10,
  },

  titulo: {
    textAlign: 'center',
    fontSize: 33,
    fontWeight: 'bold',
    color: '#413267',
  },

  texto: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#413267',
    lineHeight: 24,
    marginBottom: 5,
    
  },

  botao: {
    width: '93%',
    marginTop: 30,
  },

  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  popupTitle: {
    fontSize: 20,
    marginBottom: 10,
  },

  popupMessage: {
    textAlign: 'center',
    marginBottom: 10,
  },

});

export default styles;