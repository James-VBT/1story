import SectionHeading from "@/components/SectionHeading";

export default function GuidesPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <SectionHeading
            title="Guides"
            subtitle="Use this area to upload files you wish to share with your users."
            alignment="center"
          />
          <p className="text-gray-medium mt-8 max-w-lg mx-auto leading-relaxed">
            You can manage who has access to your files and what they can do,
            such as view &amp; download, upload items and more.
          </p>
        </div>
      </div>
    </main>
  );
}
