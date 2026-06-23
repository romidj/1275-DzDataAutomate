new_slide18 = """            <!-- SLIDE 18: Conclusion & Vision (Light Theme) -->
            <section class="slide light-theme" id="slide-18">
                <div class="flex-col" style="height: 100%; justify-content: center; position: relative;">
                    <div>
                        <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-dark); background: rgba(68,2,112,0.1); padding: 0.4rem 1rem; border-radius: 20px;">
                            Conclusion &amp; Future Vision
                        </span>
                    </div>

                    <h1 style="font-size: 3rem; margin-top: 1.5rem; margin-bottom: 2rem; color: var(--bg-dark);">
                        Democratizing Data Science <br>across the <span style="color: var(--accent-dark);">Algerian Market</span>
                    </h1>

                    <div class="grid-3" style="gap: 2rem; margin-bottom: 3rem;">
                        <div class="glass-card" style="padding: 1.5rem;">
                            <strong style="color: var(--bg-dark); font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Technically Sound</strong>
                            Automated pipeline fully executed and validated using representative domestic datasets.
                        </div>
                        <div class="glass-card" style="padding: 1.5rem;">
                            <strong style="color: var(--bg-dark); font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Strategically Defensible</strong>
                            Adapting to key national constraints (data sovereignty, internet coverage, pricing blocks).
                        </div>
                        <div class="glass-card" style="padding: 1.5rem;">
                            <strong style="color: var(--bg-dark); font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Financially Viable</strong>
                            Zero initial server liabilities, cash positive by month 8 under conservative forecasts.
                        </div>
                    </div>

                    <div style="border-left: 4px solid var(--accent-dark); padding-left: 1.5rem; max-width: 800px;">
                        <p style="font-size: 1.15rem; color: var(--bg-dark); font-weight: 600; line-height: 1.5;">
                            "To establish a locally developed platform as the reference solution for data-driven decision-making in Algeria and the broader North African region."
                        </p>
                    </div>
                </div>

                <div class="speaker-notes">
                    <ul>
                        <li>Recap the three foundations of our defense:
                            <ul>
                                <li><strong>Technically sound:</strong> Core pipeline tested and verified.</li>
                                <li><strong>Strategically defensible:</strong> Resolving key domestic blockers (confidentiality, cost).</li>
                                <li><strong>Financially viable:</strong> Breakeven in year 1.</li>
                            </ul>
                        </li>
                        <li>Highlight future directions: integration of clustering/time-series, Arabic-language localization, and formalizing incubator partnerships.</li>
                        <li>Close the defense: "Thank you for your attention. We are ready to take your questions."</li>
                    </ul>
                </div>
            </section>
"""

with open(r'c:\Users\gsi\Documents\1275\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f'Total lines before: {len(lines)}')

# Find start of broken section (the SLIDE 18 comment line, 0-indexed)
start_idx = None
for i, line in enumerate(lines):
    if '<!-- SLIDE 18: Conclusion' in line:
        start_idx = i
        break

# Find the closing </section> of the last orphan (old slide-16 conclusion)
end_idx = None
for j in range(start_idx, len(lines)):
    if '</section>' in lines[j]:
        end_idx = j
        break

print(f'Replacing lines {start_idx+1} to {end_idx+1}')

new_lines = lines[:start_idx] + [new_slide18] + lines[end_idx+1:]

with open(r'c:\Users\gsi\Documents\1275\index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'Total lines after: {len(new_lines)}')
print('Done!')
