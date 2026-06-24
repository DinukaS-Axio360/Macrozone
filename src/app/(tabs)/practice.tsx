import { colors, globalStyles } from "@/styles/global";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { RadioButton } from "react-native-paper";

export default function Practice() {
  // For manually implemented searchable dropdown
  const data = [
    { id: "1", name: "React Native" },
    { id: "2", name: "ReactJS" },
    { id: "3", name: "NextJS" },
    { id: "4", name: "NodeJS" },
    { id: "5", name: "ExpressJS" },
  ];

  const dropdowndata = [
    { label: "React Native", value: "rn" },
    { label: "ReactJS", value: "react" },
    { label: "NextJS", value: "next" },
  ];

  const [fullName, setFullName] = useState("");
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState([10, 100]);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [number, onChangeNumber] = useState("");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [search, setSearch] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const [country, setCountry] = useState<any>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const [dropdownvalue, dropdownsetValue] = useState(null);

  const [selected, setSelected] = useState([]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View style={globalStyles.header}>
        <Text style={globalStyles.title2}>Create Profile</Text>
      </View>

      <Text style={styles.textLabel}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor={colors.textSecondary}
      />
      <Text style={styles.textLabel}>Number Input</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        value={number}
        onChangeText={onChangeNumber}
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />
      <Text style={styles.textLabel}>Checkbox</Text>
      <Checkbox
        value={checked}
        onValueChange={setChecked}
        style={styles.checkbox}
      />

      <Text style={styles.textLabel}> Slider</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={10}
        maximumValue={100}
        value={values[1]}
        onValueChange={(val) => setValues([10, val])}
      />

      <Text style={styles.textLabel}>
        {values[0]} – {values[1]}
      </Text>

      <Text style={styles.textLabel}>Radio Button</Text>
      <View style={styles.radioGroup}>
        {/* First radio button for ReactJS */}
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option1"
            status={selectedValue === "option1" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option1")}
            color="#007BFF" // Custom color for the radio button
          />
          <Text style={styles.radioLabel}>ReactJS</Text>
        </View>

        {/* Second radio button for NextJs */}
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option2"
            status={selectedValue === "option2" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option2")}
            color="#007BFF" // Custom color for the radio button
          />
          <Text style={styles.radioLabel}>NextJs</Text>
        </View>

        {/* Third radio button for React Native */}
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option3"
            status={selectedValue === "option3" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option3")}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>React Native</Text>
        </View>
      </View>

      <Text style={styles.textLabel}>Date of Birth</Text>
      <Pressable style={styles.input} onPress={() => setShow(true)}>
        <Text style={{ color: colors.text }}>{date.toDateString()}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.textLabel}>Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Search frameworks..."
        value={search}
        onChangeText={setSearch}
        onFocus={() => setShowDropdown(true)}
        placeholderTextColor={colors.textSecondary}
      />

      {showDropdown && search.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemBox}>
                <Text
                  style={styles.itemText}
                  onPress={() => {
                    setSearch(item.name);
                    setShowDropdown(false);
                  }}
                >
                  {item.name}
                </Text>
              </View>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
      <Text style={styles.textLabel}>Country</Text>

      <View style={styles.input}>
        <Text
          style={{ color: country ? colors.text : colors.textSecondary }}
          onPress={() => setShowCountryPicker(true)}
        >
          {country ? country.name : "Select country"}
        </Text>
      </View>
      {showCountryPicker && (
        <CountryPicker
          withFilter
          withFlag
          withCountryNameButton
          withAlphaFilter
          countryCode={country?.cca2 ?? "US"}
          visible={showCountryPicker}
          onClose={() => setShowCountryPicker(false)}
          onSelect={(country) => {
            setCountry(country);
            setShowCountryPicker(false);
          }}
        />
      )}

      {country && (
        <Text style={styles.helper}>
          Selected: {country.name} ({country.cca2})
        </Text>
      )}

      <Text style={styles.textLabel}>Dropdown</Text>
      <Dropdown
        style={styles.input}
        containerStyle={{
          borderRadius: 10,
          marginTop: 8,
          maxHeight: 200,
        }}
        data={dropdowndata}
        labelField="label"
        valueField="value"
        placeholder="Select framework"
        value={dropdownvalue}
        onChange={(item) => dropdownsetValue(item.value)}
      />
      <Text style={styles.textLabel}> Multi Select</Text>
      <MultiSelect
        style={styles.input}
        data={dropdowndata}
        labelField="label"
        valueField="value"
        placeholder="Select multiple"
        value={selected}
        onChange={(items) => setSelected(items)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  textLabel: {
    color: colors.text,
    fontSize: 16,
    marginTop: 16,
  },
  helper: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  doneBtn: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 4,
  },
  doneBtnText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 15,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownList: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  dropdownItemText: {
    color: colors.text,
    fontSize: 15,
  },
  dropdownCheck: {
    color: colors.primary,
    fontWeight: "700",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  itemBox: {
    backgroundColor: colors.surface,
    padding: 14,
    marginTop: 10,
    borderRadius: 10,
  },

  itemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  dropdown: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginTop: 8,
    maxHeight: 200,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
