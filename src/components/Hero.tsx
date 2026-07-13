/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-[#010828]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4" type="video/mp4" />
        <source src="Notebook LM activities Intro.mp4" type="video/mp4" />
        <source src="/Notebook LM activities Intro.mp4" type="video/mp4" />
      </video>
      <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 z-10 flex flex-col justify-between min-h-screen">
        {/* ROW 1 (top) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-4 sm:gap-6">
            <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] font-normal uppercase leading-[1.05] sm:leading-[1] md:leading-[1] text-cream relative">
              Hello!<br />
              I'm Notebook LM
              <span className="font-condiment text-[36px] sm:text-[52px] md:text-[68px] font-normal normal-case text-neon mix-blend-exclusion leading-[0.79] tracking-[0.03em] absolute right-[-8px] bottom-[-20px] sm:bottom-[-30px] md:bottom-[-40px] -rotate-1 opacity-90">
                Notebook LM
              </span>
            </h2>
            <img
              src="https://www.gstatic.com/images/branding/product/2x/notebooklm_96dp.png"
              alt="Notebook LM Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-md self-center animate-bounce-slow"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase text-cream max-w-[320px] leading-relaxed">
            A great Artificial Intelligence tool dedicated to excel study and research, and you're going to learn how to use it!
          </p>
        </div>

        {/* ROW 2 (bottom) */}
        <div className="flex justify-between items-start mt-auto">
          <div className="flex flex-col gap-5 max-w-[335px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A great Artificial Intelligence tool dedicated to excel study and research, and you're going to learn how to use it!
            </p>
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A great Artificial Intelligence tool dedicated to excel study and research, and you're going to learn how to use it!
            </p>
          </div>
          <div className="hidden lg:flex flex-col gap-5 max-w-[335px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A great Artificial Intelligence tool dedicated to excel study and research, and you're going to learn how to use it!
            </p>
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A great Artificial Intelligence tool dedicated to excel study and research, and you're going to learn how to use it!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
