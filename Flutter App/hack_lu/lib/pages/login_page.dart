import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:hack_lu/pages/dashboard.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/hex_color.dart';

//import '../services/api_service.dart';
import '../config.dart';
//import '../models/login_request_model.dart';
import 'package:http/http.dart' as http;


class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool isApiCallProcess = false;
  bool hidePassword = true;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  String? email;
  String? password;
   late SharedPreferences prefs;

  @override
  void initState() {
    super.initState();
  }
  void initSharedPref() async{
    prefs = await SharedPreferences.getInstance();
  }

  void loginUser(BuildContext context) async{
    var reqBody = {
      "email":email,
      "password":password
    };

    var response = await http.post(Uri.parse(login),
        headers: {"Content-Type":"application/json"},
        body: jsonEncode(reqBody)
    );


    var jsonResponse = jsonDecode(response.body);
    print(jsonResponse['status']);

    if(jsonResponse['status']){
      var myToken = jsonResponse['token'];
      //prefs.setString('token', myToken);
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context)=>HomeDashboard(token: myToken,)));
    }else{
      print('Something went wrong');
    }

  }




  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#283B71"),
        body: ProgressHUD(
          child: Form(
            key: globalFormKey,
            child: _loginUI(context),
          ),
          inAsyncCall: isApiCallProcess,
          opacity: 0.3,
          key: UniqueKey(),
        ),
      ),
    );
  }

  Widget _loginUI(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height / 5.2,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.white,
                  Colors.white,
                ],
              ),
              borderRadius: BorderRadius.only(
                //topLeft: Radius.circular(100),
                //topRight: Radius.circular(150),
                bottomRight: Radius.circular(100),
                bottomLeft: Radius.circular(100),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[

                Align(
                  alignment: Alignment.center,
                  child: Image.asset(
                    "assets/images/logo.png",
                    fit: BoxFit.contain,
                    width: 130,
                  ),
                ),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(left: 20, bottom: 30, top: 50),
            child: Text(
              "Login",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 25,
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: FormHelper.inputFieldWidget(
              context,
              "Email",
              "Email",

              (onValidateVal) {
                if (onValidateVal.isEmpty) {
                  return 'email can\'t be empty.';
                }

                return null;
              },
              (onSavedVal) => {
                email = onSavedVal,
              },
              prefixIcon: const Icon(Icons.person),
              initialValue: "",
              obscureText: false,
              borderFocusColor: Colors.white,
              prefixIconColor: Colors.white,
              borderColor: Colors.white,
              textColor: Colors.white,
              hintColor: Colors.white.withOpacity(0.7),
              borderRadius: 10,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: FormHelper.inputFieldWidget(
              context,
              //const Icon(Icons.lock),
              "Password",
              "Password",
              (onValidateVal) {
                if (onValidateVal.isEmpty) {
                  return 'Password can\'t be empty.';
                }

                return null;
              },
              (onSavedVal) => {
                password = onSavedVal,
              },
              prefixIcon: const Icon(Icons.lock),
              initialValue: "",
              obscureText: hidePassword,
              borderFocusColor: Colors.white,
              prefixIconColor: Colors.white,
              borderColor: Colors.white,
              textColor: Colors.white,
              hintColor: Colors.white.withOpacity(0.7),
              borderRadius: 10,
              suffixIcon: IconButton(
                onPressed: () {
                  setState(() {
                    hidePassword = !hidePassword;
                  });
                },
                color: Colors.white.withOpacity(0.7),
                icon: Icon(
                  hidePassword ? Icons.visibility_off : Icons.visibility,
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Padding(
              padding: const EdgeInsets.only(
                right: 25,
              ),
              child: RichText(
                text: TextSpan(
                  style: const TextStyle(color: Colors.grey, fontSize: 14.0),
                  children: <TextSpan>[
                    TextSpan(
                      text: 'Forget Password ?',
                      style: const TextStyle(
                        color: Colors.white,
                        decoration: TextDecoration.underline,
                      ),
                      recognizer: TapGestureRecognizer()..onTap = () {},
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Center(
            child: FormHelper.submitButton(
              "Login",
              () {
                if (validateAndSave()) {
                    loginUser(context);
                  setState(() {
                    isApiCallProcess = true;
                  });

                  // LoginRequestModel model = LoginRequestModel(
                  //   email: email,
                  //   password: password,
                  // );

                  // APIService.login(model).then(
                  //   (response) {
                  //     setState(() {
                  //       isApiCallProcess = false;
                  //     });
                  //
                  //     if (response) {
                  //       Navigator.pushNamedAndRemoveUntil(
                  //         context,
                  //         '/home',
                  //         (route) => false,
                  //       );
                  //     } else {
                  //       FormHelper.showSimpleAlertDialog(
                  //         context,
                  //         Config.appName,
                  //         "Invalid Email/Password !!",
                  //         "OK",
                  //         () {
                  //           Navigator.of(context).pop();
                  //         },
                  //       );
                  //     }
                  //   },
                  // );
                }
              },
              btnColor: HexColor("283B71"),
              borderColor: Colors.white,
              txtColor: Colors.white,
              borderRadius: 10,
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          const Center(
            child: Text(
              "OR",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Align(
            alignment: Alignment.center,
            child: Padding(
              padding: const EdgeInsets.only(
                right: 25,
              ),
              child: RichText(
                text: TextSpan(
                  style: const TextStyle(color: Colors.white, fontSize: 14.0),
                  children: <TextSpan>[
                    const TextSpan(
                      text: 'Dont have an account? ',
                    ),
                    TextSpan(
                      text: 'Sign up',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          Navigator.pushNamed(
                            context,
                            '/register',
                          );
                        },
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
        ],
      ),
    );
  }

  bool validateAndSave() {
    final form = globalFormKey.currentState;
    if (form!.validate()) {
      form.save();
      return true;
    }
    return false;
  }
}
