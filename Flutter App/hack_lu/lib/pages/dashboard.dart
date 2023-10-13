import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({required this.token , super.key});

  final token;
  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard> {

  late String email;
  @override
  void initState() {
    // TODO: implement initState
    Map<String,dynamic> jwtDecodedToken = JwtDecoder.decode((widget.token));

    email = jwtDecodedToken['email'];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: Center(
        child: Text(email!),
      )
    );
  }
}
