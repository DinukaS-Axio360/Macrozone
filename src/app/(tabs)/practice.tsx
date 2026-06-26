import { colors, globalStyles } from "@/styles/global";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import CountryPicker from "react-native-country-picker-modal";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import InputSpinner from "react-native-input-spinner";
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

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});

  const [error, setError] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);

  const CELL_COUNT = 6;
  const [otp, setOtp] = useState("");

  const [range, setRange] = React.useState([5, 20]);

  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const [imageUri, setImageUri] = useState<string | null>(null);

  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null,
  );

  const handleDayPress = (day: any) => {
    const selectedDate = day.dateString;

    setError(""); // clear previous error

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate("");

      setMarkedDates({
        [selectedDate]: {
          startingDay: true,
          endingDay: true,
          color: colors.primary,
          textColor: "white",
        },
      });

      return;
    }

    // second click → validate order
    const start = new Date(startDate);
    const end = new Date(selectedDate);

    if (end < start) {
      setError("End date cannot be before start date");
      return;
    }

    setEndDate(selectedDate);

    let range: any = {};
    let current = new Date(startDate);

    while (current <= end) {
      const date = current.toISOString().split("T")[0];

      range[date] = {
        color: colors.primary,
        textColor: "white",
      };

      current.setDate(current.getDate() + 1);
    }

    range[startDate] = {
      startingDay: true,
      color: colors.primary,
      textColor: "white",
    };

    range[selectedDate] = {
      endingDay: true,
      color: colors.primary,
      textColor: "white",
    };

    setMarkedDates(range);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera permission is required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

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

      <Text style={styles.textLabel}>From Date</Text>

      <Pressable style={styles.input} onPress={() => setShowFrom(true)}>
        <Text style={{ color: colors.text }}>{fromDate.toDateString()}</Text>
      </Pressable>
      {showFrom && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFrom(false);
            if (selectedDate) {
              setFromDate(selectedDate);
            }
          }}
        />
      )}
      <Text style={styles.textLabel}>To Date</Text>

      <Pressable style={styles.input} onPress={() => setShowTo(true)}>
        <Text style={{ color: colors.text }}>{toDate.toDateString()}</Text>
      </Pressable>

      {showTo && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowTo(false);
            if (selectedDate && selectedDate < fromDate) {
              alert("To date cannot be before From date");
              return;
            }
            if (selectedDate) {
              setToDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.helper}>
        Selected Range: {fromDate.toDateString()} → {toDate.toDateString()}
      </Text>

      <Text style={styles.textLabel}>Input Spinner</Text>
      <InputSpinner
        style={styles.textLabel}
        min={0}
        max={100}
        step={1}
        value={quantity}
        onChange={setQuantity}
      />

      <Text style={styles.textLabel}>Date Range</Text>

      {error ? (
        <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
      ) : null}
      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />

      <Text style={styles.helper}>From: {startDate || "Not selected"}</Text>

      <Text style={styles.helper}>To: {endDate || "Not selected"}</Text>

      <Text style={styles.textLabel}>Enable Notifications</Text>

      <View style={styles.switchRow}>
        <Text style={{ color: colors.text }}>
          {isEnabled ? "Enabled" : "Disabled"}
        </Text>

        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#ccc", true: colors.primary }}
          thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
        />
      </View>

      <Text style={styles.textLabel}>OTP Verification</Text>

      <CodeField
        ref={ref}
        {...props}
        value={otp}
        onChangeText={setOtp}
        cellCount={CELL_COUNT}
        rootStyle={{ marginTop: 16 }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            style={{
              width: 45,
              height: 50,
              borderWidth: 1,
              borderColor: isFocused ? colors.primary : "#ccc",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              marginHorizontal: 4,
            }}
          >
            <Text style={{ fontSize: 18, color: colors.text }}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.textLabel}>Multi Slider</Text>
      <View>
        <Text style={styles.textLabel}>Range </Text>
        <MultiSlider
          values={range}
          min={1}
          max={100}
          step={1}
          onValuesChange={(values) => setRange(values)}
          sliderLength={300}
          selectedStyle={{ backgroundColor: "#f0d079" }}
          unselectedStyle={{ backgroundColor: "#ffffff" }}
          markerStyle={{ backgroundColor: "#1d55b7" }}
        />
        <Text style={styles.textLabel}>{range.join(" - ")}</Text>
      </View>

      <Text style={styles.textLabel}>Profile Image</Text>

      <Pressable style={styles.input} onPress={pickImage}>
        <Text>Pick Image from Gallery</Text>
      </Pressable>

      <Pressable style={styles.input} onPress={takePhoto}>
        <Text>Open Camera</Text>
      </Pressable>

      <Pressable style={styles.input} onPress={pickFile}>
        <Text>Pick File</Text>
      </Pressable>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginTop: 20,
            alignSelf: "center",
          }}
        />
      )}

      {file && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.helper}>File Name: {file.name}</Text>
          <Text style={styles.helper}>Size: {file.size} bytes</Text>
          <Text style={styles.helper}>Type: {file.mimeType}</Text>
        </View>
      )}
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
