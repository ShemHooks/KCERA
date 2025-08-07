import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const group_picture = require("../../../assets/app-images/dev-team/grouppic.jpg");
const logo = require("../../../assets/app-images/KCERA.png");
const regidor = require("../../../assets/app-images/dev-team/regidor.jpg");
const tirado = require("../../../assets/app-images/dev-team/tirado.jpg");
const ynchausti = require("../../../assets/app-images/dev-team/ynchausti.jpg");
const pelingon = require("../../../assets/app-images/dev-team/pelingon.jpg");
const canete = require("../../../assets/app-images/dev-team/canete.jpg");
const tabligan = require("../../../assets/app-images/dev-team/tabligan.jpg");

const HomeScreen = () => {
  const pageTitle = "About KCERA";
  return (
    <View className="w-full ">
      <ScrollView style={styles.scrollView}>
        <View className="flex items-center ">
          <Image source={logo} style={styles.logo} />
          <Text className="text-xl font-bold ">{pageTitle}</Text>
        </View>
        <View style={styles.tabs} className="pl-4">
          <Text className="text-lg text-left">
            {"    "}The Kabankalan City Emergency Response Application (KCERA)
            is a mobile and web-based platform designed to enhance emergency
            communication and streamline the response workflow between residents
            and local authorities. It empowers users to report emergencies
            quickly and allows responders to locate and assist victims more
            efficiently using location-based technology.
          </Text>
        </View>
        <View style={styles.tabs} className="pl-4">
          <Text className="text-xl font-bold text-center">Key Features</Text>
          <Text className="text-lg">
            {"\u2022"} Emergency Reporting via real-time forms and geolocation{" "}
            {"\n"}
            {"\u2022"} Notifications and status tracking of reports {"\n"}
            {"\u2022"} Admin dashboard for managing incidents and responders{" "}
            {"\n"}
            {"\u2022"} Location mapping for quicker response deployment {"\n"}
          </Text>
        </View>

        <View className="w-full pl-4 " style={styles.tabs}>
          <Text className="text-xl font-bold text-center">
            Mission and Vision
          </Text>
          <View style={styles.tabs}>
            <Text className="text-xl font-bold">Mission</Text>
            <Text className="text-lg text-left">
              {"    "}
              To provide the people of Kabankalan City with a reliable,
              accessible, and real-time emergency response platform that
              empowers citizens to report incidents efficiently, enhances
              coordination among responders, and ensures timely, life-saving
              assistance through innovative technology.
            </Text>
          </View>
          <View style={styles.tabs}>
            <Text className="text-xl font-bold">Vision</Text>
            <Text className="text-lg text-left">
              {"    "}A safer Kabankalan City where every citizen can swiftly
              access emergency support, and where digital solutions strengthen
              community resilience, public safety, and responsive governance.
            </Text>
          </View>
        </View>
        <View style={styles.tabs}>
          <Text className="text-xl font-bold text-center">
            KCERA DEVELOPMENT TEAM
          </Text>
          <View style={styles.groupPictureContainer}>
            <Image source={group_picture} style={styles.groupPicture} />
          </View>
          <View className="pl-4">
            <Text>
              {"      "}
              <Text className="text-lg">
                Kabankalan City Emergency Response Application (KCERA) was
                proudly developed by a dedicated group of students from
                Kabankalan Catholic College Inc. with the guidance of
                experienced mentors. The team is committed to creating a digital
                solution that helps save lives by improving emergency response
                services in Kabankalan City.
              </Text>
            </Text>
          </View>
          {/* individual introduction */}
          <View style={[styles.devTeamIndividualContainer, styles.tabs]}>
            {/* Shem */}
            <View style={styles.devTeamPersonalContainer}>
              <View style={styles.devTeamPersonalImageContainer}>
                <Image source={regidor} style={styles.personalImage} />
              </View>
              <View style={styles.personalDescription}>
                <Text className="text-xl font-bold">SHEM M. REGIDOR</Text>
                <Text className="pl-4 text-left">
                  Team Leader, Project Manager, Lead Developer
                </Text>
                <Text></Text>
                <Text className="pl-4 text-left">
                  Oversees the entire development lifecycle, manages the team’s
                  workflow, and leads system implementation and technical
                  direction.
                </Text>
              </View>
            </View>
            {/* christian */}
            <View style={styles.devTeamPersonalContainer}>
              <View style={styles.devTeamPersonalImageContainer}>
                <Image source={tirado} style={styles.personalImage} />
              </View>
              <View style={styles.personalDescription}>
                <Text className="text-xl font-bold">CHRISTIAN I. TIRADO</Text>
                <Text className="pl-4 text-left">
                  Admin Side Front-end Developer, Lead Manuscript Writer
                </Text>
                <Text></Text>
                <Text className="pl-4 text-left">
                  Developed the admin-side user interface and played a central
                  role in writing and organizing the project’s documentation and
                  manuscripts.
                </Text>
              </View>
            </View>
            {/* ck */}
            <View style={styles.devTeamPersonalContainer}>
              <View style={styles.devTeamPersonalImageContainer}>
                <Image source={ynchausti} style={styles.personalImage} />
              </View>
              <View style={styles.personalDescription}>
                <Text className="text-xl font-bold">
                  CLARENCE KYLE YNCHAUSTI
                </Text>
                <Text className="pl-4 text-left">
                  Manuscript Writer, System Graphics Designer, Logistics
                </Text>
                <Text></Text>
                <Text className="pl-4 text-left">
                  Contributed to writing and editing the documentation, designed
                  visual elements of the system, and hosted development sessions
                  at his residence, often providing other support.
                </Text>
              </View>
            </View>
            {/*  */}
            <View style={styles.devTeamPersonalContainer}>
              <View style={styles.devTeamPersonalImageContainer}>
                <Image source={pelingon} style={styles.personalImage} />
              </View>
              <View style={styles.personalDescription}>
                <Text className="text-xl font-bold">
                  RAVEN DOMINIC A. PELINGON
                </Text>
                <Text className="pl-4 text-left">
                  Manuscript Writer, Logistics, Contributor
                </Text>
                <Text></Text>
                <Text className="pl-4 text-left">
                  Assisted in documentation, Manuscript Writing, and supported
                  the team by contributing to logistical needs during the
                  development phase.
                </Text>
              </View>
            </View>
            {/* sir John */}
            <View style={styles.devTeamPersonalContainer}>
              <View style={styles.devTeamPersonalImageContainer}>
                <Image source={canete} style={styles.personalImage} />
              </View>
              <View style={styles.personalDescription}>
                <Text className="text-xl font-bold">MR. JOHN CAÑETEN</Text>
                <Text className="pl-4 text-left">Project Adviser</Text>
                <Text></Text>
                <Text className="pl-4 text-left">
                  Provided consistent guidance, technical advice, and critical
                  feedback throughout the development of the KCERA system.
                </Text>
              </View>
            </View>
            {/* miss tabligan  */}
            <View style={styles.devTeamPersonalContainer}>
              <View style={styles.devTeamPersonalImageContainer}>
                <Image source={tabligan} style={styles.personalImage} />
              </View>
              <View style={styles.personalDescription}>
                <Text className="text-xl font-bold">
                  MS. LEZETH ROSE T. TABLIGAN
                </Text>
                <Text className="pl-4 text-left">Capstone Instructor</Text>
                <Text></Text>
                <Text className="pl-4 text-left">
                  Supervised the project’s academic progress, ensured compliance
                  with course requirements, and evaluated deliverables for
                  quality and relevance.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tabs} className="pl-4">
          <Text className="text-xl font-bold text-center">
            Message from the Developers
          </Text>
          <Text className="text-lg text-left">
            {"    "}As students and residents of Kabankalan City, we believe
            that technology should serve the community. KCERA was born out of
            our shared desire to contribute to public safety. We hope this
            application becomes a tool of hope and action in times of need.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text className="text-center" style={styles.footerText}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: { marginTop: 2 },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  tabs: { marginTop: 20 },
  groupPictureContainer: {
    width: "100%",
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  groupPicture: {
    width: "100%",
    height: "100%",
  },

  devTeamIndividualContainer: {
    gap: 10,
  },
  devTeamPersonalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  devTeamPersonalImageContainer: {
    width: 150,
    height: 240,
  },
  personalImage: {
    width: "100%",
    height: "100%",
  },
  personalDescription: {
    width: "55%",
    paddingTop: 10,
  },
  footer: {
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    color: "#6B7280",
  },
});
