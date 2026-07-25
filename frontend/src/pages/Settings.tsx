import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Brain,
  Save,
  Check,
} from "lucide-react";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">
            Settings
          </h1>

          <p className="text-white/50 mt-2">
            Customize your Carevo AI experience and manage preferences.
          </p>
        </div>


        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* Profile */}
          <SettingsCard
            icon={<User className="text-cyan-400" />}
            title="Profile Settings"
            description="Manage your personal information"
          >

            <div className="space-y-4">

              <InputField
                label="Full Name"
                value="Career Explorer"
              />

              <InputField
                label="Email"
                value="user@example.com"
              />

              <InputField
                label="Target Role"
                value="AI Engineer"
              />

            </div>

          </SettingsCard>



          {/* AI Preferences */}
          <SettingsCard
            icon={<Brain className="text-purple-400" />}
            title="AI Career Agent"
            description="Configure AI assistance"
          >

            <ToggleItem
              title="Automatic Job Recommendations"
              enabled
            />

            <ToggleItem
              title="Resume Improvement Suggestions"
              enabled
            />

            <ToggleItem
              title="Interview Preparation Mode"
              enabled
            />

          </SettingsCard>




          {/* Notifications */}
          <SettingsCard
            icon={<Bell className="text-pink-400" />}
            title="Notifications"
            description="Control alerts and updates"
          >

            <ToggleItem
              title="New job matches"
              enabled
            />

            <ToggleItem
              title="Application reminders"
              enabled
            />

            <ToggleItem
              title="Weekly career report"
              enabled={false}
            />

          </SettingsCard>




          {/* Security */}
          <SettingsCard
            icon={<Shield className="text-green-400" />}
            title="Security"
            description="Protect your account"
          >

            <div className="
              rounded-xl 
              bg-white/[0.03]
              border border-white/10
              p-4
            ">

              <p className="text-white text-sm font-medium">
                Two Factor Authentication
              </p>

              <p className="text-white/40 text-xs mt-1">
                Add an extra layer of account security.
              </p>


              <button
                className="
                mt-4
                px-4 py-2
                rounded-xl
                bg-gradient-to-r
                from-purple-500
                to-cyan-500
                text-white
                text-sm
                font-semibold
                "
              >
                Enable
              </button>


            </div>


          </SettingsCard>




          {/* Appearance */}
          <SettingsCard
            icon={<Palette className="text-yellow-400" />}
            title="Appearance"
            description="Customize interface style"
          >

            <div className="
              flex 
              items-center 
              justify-between
              rounded-xl
              bg-white/[0.03]
              border border-white/10
              p-4
            ">

              <div>
                <p className="text-white text-sm">
                  Theme
                </p>

                <p className="text-white/40 text-xs">
                  Dark futuristic mode
                </p>
              </div>


              <span className="
              px-3 py-1
              rounded-full
              text-xs
              bg-purple-500/20
              text-purple-300
              ">
                Dark
              </span>

            </div>


          </SettingsCard>




          {/* Data */}
          <SettingsCard
            icon={<Database className="text-blue-400" />}
            title="Data Management"
            description="Manage your career data"
          >

            <button
              className="
              w-full
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              py-3
              text-white/80
              hover:bg-white/10
              transition
              "
            >
              Export Career Data
            </button>


          </SettingsCard>


        </div>



        {/* Save Button */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={handleSave}
            className="
            flex items-center gap-2
            px-6 py-3
            rounded-xl
            bg-gradient-to-r
            from-purple-500
            to-cyan-500
            text-white
            font-semibold
            shadow-lg
            "
          >

            {
              saved ?
              <Check size={18}/>
              :
              <Save size={18}/>
            }

            {saved ? "Saved" : "Save Changes"}

          </button>

        </div>


      </motion.div>
    </PageLayout>
  );
}





function SettingsCard({
  icon,
  title,
  description,
  children,
}:any){

return(

<div
className="
rounded-[28px]
bg-white/[0.03]
border border-white/10
p-6
backdrop-blur-xl
"
>


<div className="flex items-center gap-3 mb-5">

<div className="
p-3
rounded-xl
bg-white/5
">

{icon}

</div>


<div>

<h2 className="text-white font-bold">
{title}
</h2>

<p className="text-white/40 text-xs">
{description}
</p>

</div>


</div>


{children}


</div>

)

}




function InputField({
label,
value
}:any){

return(

<div>

<label className="
text-xs
text-white/40
">
{label}
</label>


<input

defaultValue={value}

className="
mt-2
w-full
rounded-xl
bg-white/[0.03]
border border-white/10
px-4 py-3
text-white
outline-none
focus:border-cyan-400
"

/>


</div>

)

}




function ToggleItem({
title,
enabled
}:any){

return(

<div className="
flex
items-center
justify-between
py-3
border-b
border-white/5
last:border-none
">


<span className="text-white/80 text-sm">
{title}
</span>


<div
className={`
w-10 h-5
rounded-full
p-1
${enabled 
? "bg-gradient-to-r from-purple-500 to-cyan-500"
: "bg-white/10"}
`}
>

<div
className={`
w-3 h-3
rounded-full
bg-white
transition
${enabled ? "ml-5":"ml-0"}
`}
/>


</div>


</div>


)

}