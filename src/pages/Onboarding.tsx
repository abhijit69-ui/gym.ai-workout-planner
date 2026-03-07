import { RedirectToSignIn, SignedIn } from '@neondatabase/neon-js/auth/react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import React, { useState } from 'react';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { UserProfile } from '../types';

const goalOptions = [
  { value: 'bulk', label: 'Build Muscle (Bulk)' },
  { value: 'cut', label: 'Lose Fat (Cut)' },
  { value: 'recomp', label: 'Body Recomposition' },
  { value: 'strength', label: 'Build Strength' },
  { value: 'endurance', label: 'Improve Endurance' },
];

const experienceOptions = [
  { value: 'beginner', label: 'Beginner (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)' },
  { value: 'advanced', label: 'Advanced (3+ years)' },
];

const daysOptions = [
  { value: '2', label: '2 days per week' },
  { value: '3', label: '3 days per week' },
  { value: '4', label: '4 days per week' },
  { value: '5', label: '5 days per week' },
  { value: '6', label: '6 days per week' },
];

const sessionOptions = [
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' },
  { value: '90', label: '90 minutes' },
];

const equipmentOptions = [
  { value: 'full_gym', label: 'Full Gym Access' },
  { value: 'home', label: 'Home Gym' },
  { value: 'dumbbells', label: 'Dumbbells Only' },
];

const splitOptions = [
  { value: 'full_body', label: 'Full Body' },
  { value: 'upper_lower', label: 'Upper/Lower Split' },
  { value: 'ppl', label: 'Push/Pull/Legs' },
  { value: 'custom', label: 'Let AI Decide' },
];

export default function Onboardisng() {
  const { user, saveProfile } = useAuth();
  const [formdata, setFormData] = useState({
    goal: 'bulk',
    experience: 'intermediate',
    daysPerWeek: '4',
    sessionLength: '60',
    equipment: 'full_gym',
    injuries: '',
    prefferedSplit: 'upper_lower',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleQuestionaire(e: React.SubmitEvent) {
    e.preventDefault();

    const profile: Omit<UserProfile, 'userId' | 'updatedAt'> = {
      goal: formdata.goal as UserProfile['goal'],
      experience: formdata.experience as UserProfile['experience'],
      daysPerWeek: parseInt(formdata.daysPerWeek),
      sessionLength: parseInt(formdata.sessionLength),
      equipment: formdata.equipment as UserProfile['equipment'],
      injuries: formdata.injuries || undefined,
      prefferedSplit: formdata.prefferedSplit as UserProfile['prefferedSplit'],
    };
    try {
      await saveProfile(profile);
      setIsGenerating(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsGenerating(false);
    }
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <SignedIn>
      <div className='min-h-screen pt-24 pb-12 px-6'>
        <div className='max-w-xl mx-auto'>
          {/* Progress Indicator */}

          {/* Step1: Questionaire */}
          {!isGenerating ? (
            <Card variant='bordered'>
              <h1 className='text-2xl font-bold mb-2'>
                Tell Us About Yourself
              </h1>
              <p className='text-muted mb-6'>
                Help us create the perfect plan for you.
              </p>

              <form onSubmit={handleQuestionaire} className='space-y-5'>
                <Select
                  id='goal'
                  label="What's your primary goal?"
                  options={goalOptions}
                  value={formdata.goal}
                  onChange={(e) => updateForm('goal', e.target.value)}
                />
                <Select
                  id='experience'
                  label='Training experience'
                  options={experienceOptions}
                  value={formdata.experience}
                  onChange={(e) => updateForm('experience', e.target.value)}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <Select
                    id='daysPerWeek'
                    label='Days per week'
                    options={daysOptions}
                    value={formdata.daysPerWeek}
                    onChange={(e) => updateForm('daysPerWeek', e.target.value)}
                  />
                  <Select
                    id='sessionLength'
                    label='Sessions Length'
                    options={sessionOptions}
                    value={formdata.sessionLength}
                    onChange={(e) =>
                      updateForm('sessionLength', e.target.value)
                    }
                  />
                </div>
                <Select
                  id='equipment'
                  label='Equipment access'
                  options={equipmentOptions}
                  value={formdata.equipment}
                  onChange={(e) => updateForm('equipment', e.target.value)}
                />
                <Select
                  id='prefferedSplit'
                  label='Preferred Training Split'
                  options={splitOptions}
                  value={formdata.prefferedSplit}
                  onChange={(e) => updateForm('prefferedSplit', e.target.value)}
                />

                <Textarea
                  id='injuries'
                  label='Any injuries or limitations? (optional)'
                  placeholder='E.g., lower back issues, shoulder impingement...'
                  rows={3}
                  value={formdata.injuries}
                  onChange={(e) => updateForm('injuries', e.target.value)}
                />

                <div className='flex gap-3 pt-2'>
                  <Button type='submit' className='flex-1 gap-2'>
                    Generate My Plan <ArrowRight className='w-4 h-4' />
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card variant='bordered' className='text-center py-16'>
              <Loader2 className='w-12 h-12 text-accent mx-auto mb-6 animate-spin' />
              <h1 className='text-2xl font-bold mb-2'>Creating Your plan</h1>
              <p className='text-muted'>
                Our AI is generating your training program...
              </p>
            </Card>
          )}

          {/* Step2: Generating */}
        </div>
      </div>
    </SignedIn>
  );
}
