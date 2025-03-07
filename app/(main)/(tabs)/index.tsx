import { CustomButton } from "@/components/common/CustomButton";
import { SearchDropdown } from "@/components/ui/SearchDropdown";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { useTenantStore } from "@/hooks/stores/useTenantStore";
import { DatabaseService } from "@/services/database/core";
import { SyncService } from "@/services/syncService";
import { useFormService } from "@/services/formService";
import { Member } from "@/types/member";
import { isLandscapeTablet, isOnline } from "@/utils/deviceInfo";
import { Icon, ListItem } from "@rneui/themed";
import Drawer from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

const MemberSchema = yup.object<Member>().shape({
  id: yup.number().optional(),
  memberId: yup.string().optional(),
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  given_name: yup.string().required("First name is required"),
  family_name: yup.string().required("Fimily name is required"),
  sex: yup.string().oneOf(["male", "female"]).required(),
  primary_phone: yup.string().required("Phone number is required"),
  photo: yup.string().optional(), // Assuming it's a URL or base64 string
  dateofbirth: yup.string().optional(),
  marital_status: yup.string().optional(),
  occupation: yup.string().optional(),
  education: yup.string().optional(),
  nid_type: yup
    .string()
    .oneOf(["VOTER_ID", "GHANA_CARD", "DRIVER_LICENSE", "NHIS_CARD"])
    .optional(),
  nid: yup.string().optional(),
  secondary_phone: yup.string().optional(),
  email: yup.string().optional(),
  creator: yup.string().required("Creator required"),
  created_at: yup.string().optional(),
  updated_at: yup.string().optional(),
  _status: yup.string().oneOf(["synced", "pending", "conflict"]).optional(),
  _lastSynced: yup.number().optional(),
});

const memberData: Member = {
  name: "Eric Mensah",
  title: "Mr",
  given_name: "Eric",
  family_name: "Mensah",
  sex: "male",
  primary_phone: "0246092155",
  creator: "ericmensah",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function Home() {
  const checkIsLandscape = isLandscapeTablet();
  const { logout } = useAuthStore();

  const handleFilter = (query: string, users: any) =>
    users.filter((user: any) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

  const { currentTenantId } = useTenantStore();
  const dbService = DatabaseService.getInstance(currentTenantId || "");
  const syncService = new SyncService(dbService);

  const formService = useFormService<Member>({
    initialValues: memberData,
    validationSchema: MemberSchema,
    dbService,
    entityName: "members",
    onSuccess: async (values) => {
      console.log("data submitted: ", values);

      //If we have internet then sync
      if (await isOnline()) {
        syncService.syncEntity("members", {});
      }
    },
  });

  const handleSave = () => {
    console.log("TenantId", currentTenantId);
    formService.handleSubmit();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Screen
        options={{
          header(props) {
            return (
              <SafeAreaView
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  underlayColor={"white"}
                  onPress={() =>
                    props.options.drawerType === "permanent"
                      ? props.navigation.setOptions({ drawerType: "front" })
                      : checkIsLandscape
                      ? props.navigation.setOptions({ drawerType: "permanent" })
                      : props.navigation.toggleDrawer()
                  }
                  name="menu"
                  style={{ marginHorizontal: 10, padding: 5 }}
                />
                <SearchDropdown
                  containerStyle={{ flex: 1 }}
                  data={users}
                  filterFunction={handleFilter}
                  renderItem={({ item, onSelect }) => {
                    return (
                      <ListItem onPress={() => onSelect(item)}>
                        <ListItem.Title>{item.name}</ListItem.Title>
                      </ListItem>
                    );
                  }}
                  onSetQuery={(item) => item.name}
                  onSelectItem={(item) => console.log(item)}
                />
              </SafeAreaView>
            );
          },
        }}
      />
      <CustomButton
        disabled={!formService.isValid}
        color={"secondary"}
        title={"Save Record"}
        onPress={() => handleSave()}
      />
      <CustomButton
        color={"warning"}
        title={formService.touched.name ? "TOUCHED" : "TOUCH"}
        onPress={() => formService.validateForm()}
      />

      <CustomButton title={"Logout"} onPress={() => logout()} />
    </SafeAreaView>
  );
}
