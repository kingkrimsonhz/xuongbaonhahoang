import { CheckCircle2, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { REAL_GALLERY, TEAM_GROUPS, WORKFLOW_STEPS } from '../data/bakeryData';

export function WorkflowSection() {
  const [activeStepIdx, setActiveStepIdx] = useState(1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const activeStep = WORKFLOW_STEPS[activeStepIdx];

  return (
    <section id="quy-trinh" className="py-12 sm:py-16 border-t border-[#E5DEF0] bg-[#FAF8FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        <div>
          <div className="max-w-3xl mb-8">
            <p className="text-xs sm:text-sm font-medium text-[#6E44A3] mb-2">
              Quy trình vận hành trực quan
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1F2D] tracking-tight text-balance">
              Từ bếp nhà sạch sẽ đến tận bàn học trước 7h15 sáng
            </h2>
            <p className="text-sm sm:text-base text-[#5E5266] mt-2 leading-relaxed">
              Khung giờ vàng buổi sáng chỉ kéo dài 30–45 phút. Đội ngũ 10 thành viên chia làm 3 tổ chuyên trách phối hợp nhịp nhàng để bánh luôn nóng hổi và không bạn nào bị muộn giờ vào tiết.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isSelected = idx === activeStepIdx;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setActiveStepIdx(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3] ${
                    isSelected
                      ? 'bg-white border-[#6E44A3] shadow-sm'
                      : 'bg-[#F2EEF7]/70 border-[#E5DEF0] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#6E44A3] mb-1">
                    <span>{step.stepNumber}</span>
                    <span className="tabular-nums text-[#635869] font-normal">{step.timeRange.split(' ')[0]}</span>
                  </div>
                  <p className="font-display text-sm sm:text-base font-bold text-[#2A1F2D] leading-snug">
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="bg-white border border-[#E5DEF0] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-sm">
            <div className="lg:col-span-6 bg-[#F2EEF7] relative min-h-[260px]">
              {!imgErrors[activeStep.stepNumber] ? (
                <img
                  src={activeStep.image}
                  alt={activeStep.imageCaption}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [activeStep.stepNumber]: true }))
                  }
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center">
                  <p className="font-display font-semibold text-[#2A1F2D]">{activeStep.title}</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E44A3] font-semibold mb-2">
                  <span>{activeStep.stepNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-[#5E5266]">
                    <Clock className="w-3.5 h-3.5 text-[#6E44A3]" />
                    {activeStep.timeRange}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2A1F2D] mb-3">
                  {activeStep.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5E5266] leading-relaxed mb-5">
                  {activeStep.summary}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {activeStep.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5 text-sm text-[#2A1F2D]">
                      <CheckCircle2 className="w-4 h-4 text-[#6E44A3] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DEF0] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-[#635869]">Phụ trách: </span>
                  <span className="font-semibold text-[#2A1F2D]">{activeStep.teamName}</span>
                </div>
                <div className="text-[#6E44A3] font-medium">
                  {activeStep.members.join(', ')}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {REAL_GALLERY.map((photo) => (
              <div
                key={photo.title}
                className="bg-white border border-[#E5DEF0] rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#F2EEF7] overflow-hidden">
                  {!imgErrors[photo.title] ? (
                    <img
                      src={photo.image}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImgErrors((prev) => ({ ...prev, [photo.title]: true }))}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-sm text-[#635869]">
                      {photo.title}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-display text-base font-bold text-[#2A1F2D]">{photo.title}</h4>
                  <p className="text-xs sm:text-sm text-[#5E5266] mt-1 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="doi-ngu" className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#6E44A3] mb-1.5">
                Tổ chức nhân sự 10 thành viên
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1F2D] tracking-tight">
                Phân công 3 tổ chuyên trách & hỗ trợ chéo
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#635869] inline-flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#6E44A3]" />
              <span>Đảm bảo đúng giờ vào tiết học của cả 10 bạn</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_GROUPS.map((team) => (
              <div
                key={team.name}
                className="bg-white border border-[#E5DEF0] rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#635869] mb-2">
                    <span className="font-semibold text-[#6E44A3]">{team.role}</span>
                    <span className="tabular-nums">{team.shift}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#2A1F2D] mb-2">{team.name}</h4>
                  <p className="text-sm font-semibold text-[#2A1F2D] bg-[#F2EEF7] px-3 py-2 rounded-xl mb-4">
                    Thành viên: {team.members.join(' · ')}
                  </p>
                  <ul className="space-y-2 text-sm text-[#5E5266]">
                    {team.responsibilities.map((task) => (
                      <li key={task} className="leading-relaxed">
                        • {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
